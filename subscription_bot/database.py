import aiosqlite

async def init_db():
    async with aiosqlite.connect("saas_platform.db") as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS channels (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                admin_tg_id INTEGER,
                channel_tg_id TEXT,
                channel_name TEXT,
                subscription_price REAL
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS subscriptions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_tg_id INTEGER,
                channel_tg_id TEXT,
                expires_at TIMESTAMP
            )
        """)
        await db.commit()
