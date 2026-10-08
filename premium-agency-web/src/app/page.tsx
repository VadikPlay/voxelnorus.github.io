"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111827] selection:bg-blue-200">
      
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight flex items-center gap-2">
            <img src="/logo.jpg" alt="OrbitDev" className="w-7 h-7 rounded-full object-cover" />
            OrbitDev
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
            <a href="#services" className="hover:text-black transition-colors">Услуги</a>
            <a href="#work" className="hover:text-black transition-colors">Проекты</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          </nav>
          <a href="https://t.me/EuNekto" target="_blank" rel="noreferrer" className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
            Связаться <ArrowRight className="inline-block w-4 h-4 ml-1" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="container mx-auto px-6 py-20 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-xs font-bold tracking-widest text-gray-400 mb-6 uppercase">
              Automation that works
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-gray-900">
              Я создаю <em className="text-blue-600 not-italic">Telegram-ботов</em> и системы автоматизации.
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
              Превращаю вашу идею в рабочую систему: чистый код, прозрачная коммуникация и фиксированная цена до старта разработки.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="https://t.me/EuNekto" className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                Обсудить проект <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a href="#work" className="bg-gray-100 text-gray-900 px-8 py-3.5 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                Смотреть работы
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm border-t border-gray-100 pt-8">
              <div>
                <strong className="block text-gray-900 mb-1">Фикс. цена</strong>
                <span className="text-gray-500">До начала работы</span>
              </div>
              <div>
                <strong className="block text-gray-900 mb-1">Исходный код</strong>
                <span className="text-gray-500">Полная передача</span>
              </div>
              <div>
                <strong className="block text-gray-900 mb-1">Без созвонов</strong>
                <span className="text-gray-500">Асинхронное общение</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl overflow-hidden border border-gray-200 bg-[#0D1117] shadow-2xl relative"
          >
            <div className="bg-[#161B22] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs text-gray-400 font-mono">bot.py — Ready to deploy</div>
              <div className="w-4" /> {/* Spacer */}
            </div>
            <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300">
              <pre className="whitespace-pre">
<code><span className="text-blue-400">from</span> aiogram <span className="text-blue-400">import</span> Bot, Dispatcher{"\n"}
<span className="text-blue-400">import</span> asyncio{"\n\n"}
bot = Bot(token=<span className="text-green-400">"YOUR_TOKEN"</span>){"\n"}
dp = Dispatcher(){"\n\n"}
<span className="text-purple-400">@dp.message()</span>{"\n"}
<span className="text-blue-400">async def</span> <span className="text-yellow-200">start</span>(message):{"\n"}
{"    "}<span className="text-blue-400">await</span> message.answer(<span className="text-green-400">"Automation works"</span>){"\n\n"}
asyncio.run(dp.start_polling(bot))</code>
              </pre>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-gray-50 border-y border-gray-100 py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
              <div>
                <div className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">SERVICES</div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Что я создаю.</h2>
              </div>
              <p className="text-gray-500 max-w-sm text-lg pt-2">
                Четыре сфокусированные услуги. Выберите ту, которая решает вашу задачу.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Service 1 */}
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="text-sm font-bold text-blue-600 mb-4">01</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Бот платной подписки для канала</h3>
                <div className="text-3xl font-light text-gray-400 mb-6">$250 — 450</div>
                <p className="text-gray-500 leading-relaxed mb-10 min-h-[80px]">
                  Оплата криптой прямо на ваш кошелек, авто-инвайты, отслеживание подписок, напоминания, кик неплательщиков и админ-панель со статистикой.
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-8 pt-6 border-t border-gray-100">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Сроки: <b>3—5 дней</b></span>
                  <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-gray-400" /> Исходный код включен</span>
                </div>
                <a href="https://t.me/EuNekto" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Заказать <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Service 2 */}
              <div className="bg-[#111827] text-white p-8 md:p-10 rounded-2xl border border-gray-800 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">ХИТ</div>
                <div className="text-sm font-bold text-gray-400 mb-4">02</div>
                <h3 className="text-2xl font-bold mb-4">Кастомный бот или автоматизация</h3>
                <div className="text-3xl font-light text-gray-400 mb-6">$500 — 800</div>
                <p className="text-gray-400 leading-relaxed mb-10 min-h-[80px]">
                  Ваша уникальная логика: триалы, скидки, рефералки, уровни доступа, несколько каналов в одном боте, интеграции с CRM или Google Sheets.
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-400 mb-8 pt-6 border-t border-gray-800">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Сроки: <b>1—3 недели</b></span>
                  <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-gray-500" /> Исходный код включен</span>
                </div>
                <a href="https://t.me/EuNekto" className="inline-flex items-center text-white font-semibold hover:text-gray-300 transition-colors">
                  Обсудить проект <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Service 3 */}
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="text-sm font-bold text-blue-600 mb-4">03</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Сбор данных и парсинг</h3>
                <div className="text-3xl font-light text-gray-400 mb-6">$150 — 500</div>
                <p className="text-gray-500 leading-relaxed mb-10 min-h-[80px]">
                  Парсеры для сайтов и Telegram, мониторинг по расписанию с алертами в Telegram, Slack, на почту или в таблицы.
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-8 pt-6 border-t border-gray-100">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Сроки: <b>2—7 дней</b></span>
                  <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-gray-400" /> Исходный код включен</span>
                </div>
                <a href="https://t.me/EuNekto" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Заказать <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Service 4 */}
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="text-sm font-bold text-blue-600 mb-4">04</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Миграция на свой сервер</h3>
                <div className="text-3xl font-light text-gray-400 mb-6">$300 — 600</div>
                <p className="text-gray-500 leading-relaxed mb-10 min-h-[80px]">
                  Переезд с платных платформ: экспорт ваших данных, перенос бота на ваш сервер, никаких комиссий сервисам.
                </p>
                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-8 pt-6 border-t border-gray-100">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Сроки: <b>3—7 дней</b></span>
                  <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-gray-400" /> Исходный код включен</span>
                </div>
                <a href="https://t.me/EuNekto" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Заказать <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section id="work" className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
              <div>
                <div className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">SELECTED WORK</div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Реальные кейсы.</h2>
              </div>
              <a href="#contact" className="text-blue-600 font-medium hover:text-blue-800 pt-2">Смотреть все работы →</a>
            </div>

            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
              {/* Main Case */}
              <div className="bg-white border border-gray-200 rounded-2xl p-10 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-6">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">01</span>
                  <span>2026 • Open source • MIT</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Gatekit</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                  Self-hosted бот для продажи доступа в приватный канал с прямой оплатой на кошелек владельца. Полностью некастодиальный: бот не хранит приватные ключи и не переводит средства, только читает блокчейн для подтверждения оплаты.
                </p>
                <div className="flex flex-wrap gap-8 text-sm pt-6 border-t border-gray-100 mb-10">
                  <div><strong className="block text-gray-900 text-xl">53</strong> <span className="text-gray-500">unit tests</span></div>
                  <div><strong className="block text-gray-900 text-xl">56</strong> <span className="text-gray-500">end-to-end checks</span></div>
                  <div><strong className="block text-gray-900 text-xl">5K+</strong> <span className="text-gray-500">строк Python</span></div>
                </div>
                <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                  Читать кейс / обсудить похожий <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Side Card */}
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-10 text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-6">
                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded">STACK</span>
                    <span>Telegram • Python • Payments</span>
                  </div>
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-5 font-mono text-xs text-gray-300 mb-8 leading-relaxed">
                    <div className="flex items-center gap-2 mb-2"><Terminal className="w-3 h-3 text-green-400"/> <span>python bot.py</span></div>
                    <div className="text-gray-500">→ payments verified</div>
                    <div className="text-gray-500">→ access updated</div>
                    <div className="text-gray-500">→ logs written</div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Чистая архитектура, покрытие тестами и правильная передача проекта — это стандарт, а не доп. опция.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#0B121C] border-t border-[#1C2734] py-12 text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <strong className="text-lg">OrbitDev</strong>
            <span className="text-[#8998ab] text-sm">Custom automation & web systems.</span>
          </div>
          <div className="flex gap-6 text-sm text-[#91a1b5]">
            <a href="https://t.me/EuNekto" className="hover:text-white transition-colors">Telegram</a>
            <a href="mailto:vinnipug87@gmail.com" className="hover:text-white transition-colors">vinnipug87@gmail.com</a>
            <a href="https://github.com/VadikPlay" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
