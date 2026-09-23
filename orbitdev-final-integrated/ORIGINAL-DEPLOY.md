# Публикация

Два бесплатных пути. Можно оба — GitHub Pages как основной адрес, свой домен как
красивый редирект.

---

## Вариант A. GitHub Pages (рекомендую начать с него)

Бесплатно, HTTPS из коробки, и адрес `твой_логин.github.io` для разработчика сам по себе
сигнал. Плюс он не отвалится, если ты забудешь продлить домен или сервер упадёт.

### A1. Отдельный репозиторий портфолио

```bash
cd portfolio
git init
git add .
git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/ТВОЙ_ЛОГИН/ТВОЙ_ЛОГИН.github.io.git
git push -u origin main
```

Репозиторий с именем ровно `ТВОЙ_ЛОГИН.github.io` публикуется на корневом адресе.
В настройках репозитория: **Settings → Pages → Source: Deploy from a branch**,
ветка `main`, папка **`/dist`**. Через минуту сайт живой на
`https://ТВОЙ_ЛОГИН.github.io`.

Папку `/dist` обязательно коммить — Pages отдаёт готовые файлы, он не запускает `build.py`.

### A2. Автосборка при пуше (чтобы не коммитить dist руками)

Положи это в `.github/workflows/pages.yml`, и GitHub будет собирать сайт сам:

```yaml
name: Build and deploy portfolio
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Build
        run: python3 build.py
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Тогда в **Settings → Pages → Source** выбери **GitHub Actions**, и `dist/` можно
добавить в `.gitignore`. Дальше цикл такой: поправил JSON → `git push` → через минуту
сайт обновился.

### A3. Свой домен на GitHub Pages

Если хочешь `dev.voxeldropz.store` вместо `github.io`:

1. У регистратора домена добавь CNAME-запись: `dev` → `ТВОЙ_ЛОГИН.github.io.`
2. Создай файл `static/CNAME`... вернее проще: положи домен в `dist/CNAME` при сборке.
   Добавь в конец `main()` в `build.py`:
   ```python
   (DIST / "CNAME").write_text("dev.voxeldropz.store\n", encoding="utf-8")
   ```
3. В **Settings → Pages → Custom domain** укажи тот же домен и включи **Enforce HTTPS**
   (появится через несколько минут, когда выпустится сертификат).

---

## Вариант B. Свой VPS (у тебя уже есть)

### B1. Залить файлы

```bash
python3 build.py
ssh user@сервер 'mkdir -p /var/www/portfolio'
rsync -avz --delete dist/ user@сервер:/var/www/portfolio/
```

`--delete` важен: без него удалённые страницы останутся висеть на сервере.

### B2. nginx

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name dev.voxeldropz.store;

    root /var/www/portfolio;
    index index.html;

    # Статика кешируется надолго, HTML — нет, иначе правки не видны
    location ~* \.(css|js|png|jpg|jpeg|svg|webp|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    location / {
        try_files $uri $uri/ $uri.html =404;
        add_header Cache-Control "no-cache";
    }

    gzip on;
    gzip_types text/html text/css application/xml image/svg+xml;
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### B3. HTTPS бесплатно

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d dev.voxeldropz.store
```

Certbot сам поправит конфиг и настроит автообновление. Без HTTPS браузер покажет
«не защищено» — на портфолио это убивает доверие мгновенно.

### B4. Деплой одной командой

Положи рядом `deploy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
python3 build.py
rsync -avz --delete dist/ user@сервер:/var/www/portfolio/
echo "→ https://dev.voxeldropz.store"
```

```bash
chmod +x deploy.sh && ./deploy.sh
```

---

## Про адрес: что писать в заявках

Домен `voxeldropz.store` для портфолио разработчика звучит как магазин, а не как
инженер. Варианты по убыванию адекватности:

1. `ТВОЙ_ЛОГИН.github.io` — для разработчика лучший сигнал: рядом сразу видны репозитории
2. `dev.voxeldropz.store` — поддомен нейтрализует «магазинность» основного домена
3. `voxeldropz.store` как есть — работает, но объяснять название ты будешь каждому

Главное правило: **адрес должен быть один и тот же во всех заявках и профилях.** Разные
ссылки в разных местах = нет узнаваемости.

---

## После деплоя, один раз

- [ ] Открыл сайт в режиме инкогнито — всё грузится, шрифты подхватились
- [ ] Открыл с телефона
- [ ] Проверил обе языковые версии и переключатель между ними
- [ ] Кинул ссылку себе в Telegram — проверил, как выглядит превью (за это отвечают
      og-теги, а они требуют заполненного `site.url`)
- [ ] Проверил, что `site.url` в `profile.json` совпадает с реальным адресом, и пересобрал
- [ ] Добавил сайт в **Google Search Console** и скормил `sitemap.xml` — без этого поиск
      найдёт сайт сам, но через недели, а не дни
- [ ] Поставил ссылку в профили на всех площадках и в био GitHub

## Когда обновлять

Каждый раз, когда закончил проект — сразу, пока помнишь детали. Кейс, написанный через
месяц, всегда хуже: забывается именно то, что делает его убедительным — какие были
развилки и что сломалось.
