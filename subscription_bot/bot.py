import asyncio
import logging
from datetime import datetime, timedelta
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from database import init_db
import aiosqlite
from aiocryptopay import AioCryptoPay, Networks

BOT_TOKEN = "8580162988:AAEqETNBI8lDoDKAjOutixPKuuBZw-wF51Q"
CRYPTOPAY_TOKEN = "643270:AAdTQYgVu8BM213cqPuTH1ZXQAPUGe8AJ3V" 

logging.basicConfig(level=logging.INFO)
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()
cryptopay = AioCryptoPay(token=CRYPTOPAY_TOKEN, network=Networks.MAIN_NET)

class AddChannel(StatesGroup):
    waiting_for_forward = State()
    waiting_for_price = State()

def get_main_keyboard():
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📢 Добавить свой канал", callback_data="add_channel")]
    ])

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    args = message.text.split(maxsplit=1)
    if len(args) > 1 and args[1].startswith("pay_"):
        channel_id = "-100" + args[1].replace("pay_", "")
        
        async with aiosqlite.connect("saas_platform.db") as db:
            async with db.execute("SELECT channel_name, subscription_price FROM channels WHERE channel_tg_id = ?", (channel_id,)) as cursor:
                row = await cursor.fetchone()
                
        if row:
            channel_name, price = row
            await message.answer(
                f"💳 Оплата подписки на VIP-канал **{channel_name}**\nК оплате: **${price}** (USDT) / 30 дней",
                reply_markup=InlineKeyboardMarkup(inline_keyboard=[
                    [InlineKeyboardButton(text="🪙 Оплатить через CryptoBot", callback_data=f"buy_crypto_{channel_id}_{price}")]
                ]),
                parse_mode="Markdown"
            )
        return

    await message.answer(
        "⚡️ Бот-Менеджер для платных Telegram-каналов\n\n"
        "Автоматический прием оплат в CryptoPay, выдача инвайтов и авто-кик должников.",
        reply_markup=get_main_keyboard()
    )

@dp.callback_query(F.data.startswith("buy_crypto_"))
async def process_buy_crypto(callback_query: types.CallbackQuery):
    data_parts = callback_query.data.split("_")
    channel_id = data_parts[2]
    price = float(data_parts[3])
    
    await bot.answer_callback_query(callback_query.id, "⏳ Создаю счет...")
    
    try:
        invoice = await cryptopay.create_invoice(asset='USDT', amount=price, description="Оплата подписки (30 дней)")
        
        pay_kb = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Оплатить счет 💸", url=invoice.bot_invoice_url)],
            [InlineKeyboardButton(text="🔄 Проверить оплату", callback_data=f"check_invoice_{invoice.invoice_id}_{channel_id}")]
        ])
        
        await bot.send_message(
            callback_query.from_user.id,
            f"💰 **Счет успешно сформирован!**\n\n"
            f"Сумма: **{price} USDT**\n\n"
            f"Нажмите кнопку ниже, чтобы оплатить. После оплаты нажмите «Проверить оплату».",
            reply_markup=pay_kb,
            parse_mode="Markdown"
        )
    except Exception as e:
        print(f"CryptoPay Error: {repr(e)}")
        await bot.send_message(callback_query.from_user.id, f"⚠️ Ошибка от CryptoPay: {str(e)}")

@dp.callback_query(F.data.startswith("check_invoice_"))
async def check_invoice_status(callback_query: types.CallbackQuery):
    invoice_id = int(callback_query.data.split("_")[2])
    channel_id = callback_query.data.split("_")[3]
    user_id = callback_query.from_user.id
    
    await bot.answer_callback_query(callback_query.id, "Проверяем статус платежа в блокчейне...")
    
    try:
        # Получаем инвойс по ID из CryptoPay
        invoices = await cryptopay.get_invoices(invoice_ids=invoice_id)
        if not invoices:
            await bot.send_message(user_id, "❌ Счет не найден.")
            return
            
        invoice = invoices[0]
        if invoice.status == 'paid':
            # Оплата прошла успешно! Выдаем ссылку
            try:
                # Бот должен быть админом с правом создания ссылок
                invite_link = await bot.create_chat_invite_link(chat_id=channel_id, member_limit=1)
                
                # Записываем подписку на 30 дней
                expires = datetime.now() + timedelta(days=30)
                async with aiosqlite.connect("saas_platform.db") as db:
                    await db.execute(
                        "INSERT INTO subscriptions (user_tg_id, channel_tg_id, expires_at) VALUES (?, ?, ?)",
                        (user_id, channel_id, expires.isoformat())
                    )
                    await db.commit()
                
                await bot.send_message(
                    user_id, 
                    f"✅ **Оплата подтверждена!**\n\n"
                    f"Ваша персональная ссылка для входа (действует на 1 человека):\n{invite_link.invite_link}\n\n"
                    f"⏳ Подписка активна до: {expires.strftime('%Y-%m-%d %H:%M')}",
                    parse_mode="Markdown"
                )
            except Exception as link_e:
                print(f"Invite Link Error: {repr(link_e)}")
                await bot.send_message(user_id, "⚠️ Оплата получена, но я не смог создать ссылку. Передайте владельцу канала, чтобы он дал мне права на приглашение!")
        else:
            await bot.send_message(user_id, "⏳ Оплата пока не поступила или транзакция обрабатывается. Попробуйте еще раз через минуту.")
            
    except Exception as e:
        print(f"CryptoPay Check Error: {repr(e)}")
        await bot.send_message(user_id, "⚠️ Ошибка при проверке счета. Сервер CryptoPay не отвечает.")

@dp.callback_query(F.data == "add_channel")
async def process_add_channel(callback_query: types.CallbackQuery, state: FSMContext):
    await state.set_state(AddChannel.waiting_for_forward)
    await bot.answer_callback_query(callback_query.id)
    await bot.send_message(
        callback_query.from_user.id,
        "🔧 **Инструкция:**\n"
        "1. Добавьте бота в Администраторы канала.\n"
        "2. Напишите пост в канале и перешлите его мне."
    )

@dp.message(AddChannel.waiting_for_forward)
async def process_forward(message: types.Message, state: FSMContext):
    if not message.forward_origin or message.forward_origin.type != "channel":
        await message.answer("⚠️ Перешлите пост именно из канала.")
        return
        
    channel_id = message.forward_origin.chat.id
    channel_title = message.forward_origin.chat.title
    
    await state.update_data(channel_id=channel_id, channel_name=channel_title)
    await state.set_state(AddChannel.waiting_for_price)
    await message.answer(f"✅ Канал «{channel_title}» привязан. Напишите цену в долларах (например 50):")

@dp.message(AddChannel.waiting_for_price)
async def process_price(message: types.Message, state: FSMContext):
    try:
        price = float(message.text.strip())
    except ValueError:
        return
        
    data = await state.get_data()
    channel_id = data['channel_id']
    channel_name = data['channel_name']
    
    async with aiosqlite.connect("saas_platform.db") as db:
        await db.execute(
            "INSERT INTO channels (admin_tg_id, channel_tg_id, channel_name, subscription_price) VALUES (?, ?, ?, ?)",
            (message.from_user.id, str(channel_id), channel_name, price)
        )
        await db.commit()
        
    bot_info = await bot.get_me()
    clean_id = str(channel_id).replace("-100", "")
    pay_link = f"https://t.me/{bot_info.username}?start=pay_{clean_id}"
    
    await state.clear()
    await message.answer(f"🎉 **Бинго!**\n🔗 Ваша платежная ссылка:\n`{pay_link}`", parse_mode="Markdown")

# --- ФОНОВАЯ ЗАДАЧА: АВТО-КИК ДОЛЖНИКОВ ---
async def auto_kick_loop():
    while True:
        try:
            now = datetime.now().isoformat()
            async with aiosqlite.connect("saas_platform.db") as db:
                # Ищем подписки, срок которых истек
                async with db.execute("SELECT id, user_tg_id, channel_tg_id FROM subscriptions WHERE expires_at < ?", (now,)) as cursor:
                    expired = await cursor.fetchall()
                
                for sub_id, user_id, channel_id in expired:
                    try:
                        # Удаляем пользователя из канала
                        await bot.ban_chat_member(chat_id=channel_id, user_id=user_id)
                        # Сразу разбаниваем, чтобы он мог вернуться, если оплатит снова
                        await bot.unban_chat_member(chat_id=channel_id, user_id=user_id)
                        
                        # Удаляем запись о подписке из базы данных
                        await db.execute("DELETE FROM subscriptions WHERE id = ?", (sub_id,))
                        await db.commit()
                        
                        # Отправляем юзеру уведомление
                        await bot.send_message(user_id, "⚠️ Время вашей подписки истекло. Вы были исключены из VIP-канала. Оплатите подписку заново, чтобы вернуться!")
                        print(f"User {user_id} kicked from {channel_id}")
                    except Exception as kick_error:
                        print(f"Failed to kick user {user_id}: {kick_error}")
        except Exception as e:
            print(f"Auto-kick loop error: {e}")
            
        # Проверяем базу каждый час (для теста можно поставить 60 секунд)
        await asyncio.sleep(60 * 60)

async def main():
    print("Initializing database...")
    await init_db()
    print("Ready.")
    # Запускаем фоновую задачу параллельно с ботом
    asyncio.create_task(auto_kick_loop())
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
