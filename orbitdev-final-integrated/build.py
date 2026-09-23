from __future__ import annotations

import html
import json
import shutil
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / 'data'
STATIC = ROOT / 'static'
DIST = ROOT / 'dist'


def e(v) -> str:
    return html.escape(str(v), quote=True)


def tr(v, lang: str) -> str:
    if isinstance(v, dict):
        return v.get(lang) or v.get('en') or ''
    return str(v) if v is not None else ''


def load_json(p: Path):
    return json.loads(p.read_text(encoding='utf-8'))


def load_profile():
    return load_json(DATA / 'profile.json')


def load_projects():
    out=[]
    for p in sorted((DATA/'projects').glob('*.json')):
        if p.name.startswith('_'): continue
        item=load_json(p); item.setdefault('slug',p.stem); out.append(item)
    return out

UI={
'en':{
 'work':'Work','services':'Services','how':'How I work','faq':'FAQ','contact':'Get in touch',
 'hero_kicker':'AUTOMATION THAT WORKS','hero_title':'I build <em>Telegram bots</em> and automation tools.',
 'hero_lead':'Turn your idea into a working system with clean code, clear communication and a fixed price before development starts.',
 'proof1':('Fixed price','Before development'),'proof2':('Source included','Full handover'),'proof3':('No calls required','Async updates'),
 'services_kicker':'SERVICES','services_title':'What I build.','services_sub':'Four focused services. Pick the one that fits the job.',
 'work_kicker':'SELECTED WORK','work_title':'Real projects, real details.','work_sub':'View the case study for implementation details, tests and scope.',
 'how_kicker':'HOW I WORK','how_title':'Simple from the first message.','how_sub':'No unnecessary meetings. No mystery about the next step.',
 'faq_kicker':'FAQ','faq_title':'Questions clients usually ask.',
 'cta_kicker':'START A PROJECT','cta_title':'Have a project in mind?','cta_sub':'Send the idea. I’ll turn it into a clear scope, price and timeline.',
 'telegram':'Telegram','email':'Email','read_case':'Read case / discuss similar →','view_all':'View all work →',
 'details':['Do I get the source code?','Can you work on an existing bot?','Do we need a call?','Where is the system deployed?'],
 'answers':['Yes. Source code is included in the listed services unless a separate agreement says otherwise.','Yes. The first step is checking the current codebase and defining exactly what should change.','No. Projects can be scoped and updated asynchronously in writing.','For self-hosted work, deployment goes to your infrastructure and the final source is handed over.'],
 'card_action':'Get started','custom_action':'Discuss project','timeline':'Typical timeline',
 'page_back':'← Back to work','problem':'The problem','approach':'How it was built','proof':'Verification','delivers':'What it does','honesty':'When not to use it','links':'Links','tech':'Built with',
},
'ru':{
 'work':'Работы','services':'Услуги','how':'Как работаю','faq':'FAQ','contact':'Связаться',
 'hero_kicker':'АВТОМАТИЗАЦИЯ, КОТОРАЯ РАБОТАЕТ','hero_title':'Создаю <em>Telegram-ботов</em> и инструменты автоматизации.',
 'hero_lead':'Превращаю идею в рабочую систему с чистым кодом, понятной коммуникацией и фиксированной ценой до начала разработки.',
 'proof1':('Фиксированная цена','До разработки'),'proof2':('Исходники в комплекте','Полная передача'),'proof3':('Созвоны не обязательны','Обновления текстом'),
 'services_kicker':'УСЛУГИ','services_title':'Что делаю.','services_sub':'Четыре направления. Выберите то, что подходит под задачу.',
 'work_kicker':'РАБОТЫ','work_title':'Реальные проекты, реальные детали.','work_sub':'В кейсе — реализация, тесты и границы проекта.',
 'how_kicker':'КАК РАБОТАЮ','how_title':'Просто с первого сообщения.','how_sub':'Без лишних созвонов и неизвестности о следующем шаге.',
 'faq_kicker':'FAQ','faq_title':'Вопросы, которые обычно задают клиенты.',
 'cta_kicker':'НАЧАТЬ ПРОЕКТ','cta_title':'Есть задача?','cta_sub':'Опишите идею — я превращу её в понятный объём, цену и срок.',
 'telegram':'Telegram','email':'Email','read_case':'Открыть кейс / обсудить похожий →','view_all':'Все работы →',
 'details':['Передадите исходный код?','Можно доработать существующего бота?','Нужен ли созвон?','Где разворачивается система?'],
 'answers':['Да. Исходный код входит в перечисленные услуги, если отдельно не согласовано иное.','Да. Сначала проверю текущий код и точно зафиксируем, что нужно изменить.','Нет. Задачу можно согласовать и вести проект асинхронно в переписке.','Для self-hosted задач разворачиваю систему на вашей инфраструктуре и передаю исходники.'],
 'card_action':'Начать','custom_action':'Обсудить проект','timeline':'Обычный срок',
 'page_back':'← К работам','problem':'Задача','approach':'Как сделано','proof':'Проверка','delivers':'Что умеет','honesty':'Когда это не нужно','links':'Ссылки','tech':'Технологии',
}}


def head(title, description, lang, base, canonical=''):
    return f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="{e(description)}">
<title>{e(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{base}style.css">
{('<link rel="canonical" href="'+e(canonical)+'">') if canonical else ''}
</head>
<body>'''


def nav(lang, base):
    u=UI[lang]
    alt='../index.html' if lang=='ru' else 'ru/index.html'
    return f'''<header class="site-header">
  <div class="container nav">
    <a class="brand" href="{base}index.html" aria-label="OrbitDev home">OrbitDev</a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a href="{base}index.html#work">{u['work']}</a>
      <a href="{base}index.html#services">{u['services']}</a>
      <a href="{base}index.html#how">{u['how']}</a>
      <a href="{base}index.html#faq">{u['faq']}</a>
    </nav>
    <div class="nav-actions">
      <a class="lang" href="{base}{alt}">{'RU' if lang=='en' else 'EN'}</a>
      <a class="button button-dark button-small" href="{base}index.html#contact">{u['contact']} <span>→</span></a>
    </div>
  </div>
</header>'''


def footer(lang, base, profile):
    u=UI[lang]; c=profile.get('contacts',{})
    links=[]
    if c.get('telegram') and not c['telegram'].startswith('YOUR_'):
        links.append(f'<a href="https://t.me/{e(c["telegram"])}">Telegram</a>')
    if c.get('email'): links.append(f'<a href="mailto:{e(c["email"])}">{e(c["email"])}</a>')
    if c.get('github') and not c['github'].startswith('YOUR_'):
        links.append(f'<a href="https://github.com/{e(c["github"])}">GitHub</a>')
    if not links: links=['<span>Contact details will be added before publishing.</span>']
    return f'''<footer class="footer"><div class="container footer-inner"><div><strong>OrbitDev</strong><span>Custom automation & web systems.</span></div><div class="footer-links">{' '.join(links)}</div></div></footer>\n</body></html>'''


def contact_href(profile):
    tg=profile.get('contacts',{}).get('telegram','')
    if tg and not tg.startswith('YOUR_'):
        return 'https://t.me/'+tg
    return '#contact'


def service_card(service, idx, lang, profile):
    u=UI[lang]
    is_custom=idx==1
    title=tr(service.get('title'),lang)
    desc=tr(service.get('desc'),lang)
    eta=tr(service.get('eta'),lang)
    href=contact_href(profile)
    return f'''<article class="service-card{' feature' if is_custom else ''}">
  <div class="service-index">{idx+1:02d}</div>
  <h3>{e(title)}</h3>
  <div class="price">{e(service.get('price',''))}</div>
  <p>{e(desc)}</p>
  <div class="service-meta"><span>{u['timeline']}: <b>{e(eta)}</b></span><span>Source code included</span></div>
  <a class="card-link" href="{e(href)}">{u['custom_action'] if is_custom else u['card_action']} <span>→</span></a>
</article>'''


def render_index(lang, profile, projects):
    u=UI[lang]; base='' if lang=='en' else '../'
    services=profile.get('services',[])[:4]
    # Keep the approved VFinal presentation, while sourcing service/project content from data/*.json.
    project=projects[0] if projects else None
    title='OrbitDev — Telegram bots & automation' if lang=='en' else 'OrbitDev — Telegram-боты и автоматизация'
    description='OrbitDev builds Telegram bots, payment automation, data monitoring and self-hosted systems.' if lang=='en' else 'OrbitDev — Telegram-боты, автоматизация платежей, сбор данных и self-hosted решения.'
    out=[head(title,description,lang,base)]
    out.append(nav(lang,base))
    out.append(f'''<main id="top">
<section class="hero"><div class="container hero-grid">
<div class="hero-copy">
<div class="eyebrow"><span></span> {u['hero_kicker']}</div>
<h1>{u['hero_title']}</h1>
<p class="lead">{u['hero_lead']}</p>
<div class="hero-actions"><a class="button button-dark" href="{e(contact_href(profile))}">Get in touch <span>→</span></a><a class="button button-light" href="#work">View work <span>↘</span></a></div>
<div class="hero-proof"><div><b>{u['proof1'][0]}</b><span>{u['proof1'][1]}</span></div><div><b>{u['proof2'][0]}</b><span>{u['proof2'][1]}</span></div><div><b>{u['proof3'][0]}</b><span>{u['proof3'][1]}</span></div></div>
</div>
<div class="code-window"><div class="codebar"><div class="dots"><i></i><i></i><i></i></div><span>bot.py</span><small>Ready to deploy</small></div>
<pre><code><span class="blue">from</span> aiogram <span class="blue">import</span> Bot, Dispatcher
<span class="blue">import</span> asyncio

bot = Bot(token=<span class="green">"YOUR_TOKEN"</span>)
dp = Dispatcher()

<span class="violet">@dp.message()</span>
<span class="blue">async def</span> <span class="white">start</span>(message):
    <span class="blue">await</span> message.answer(<span class="green">"Automation works"</span>)

asyncio.run(dp.start_polling(bot))</code></pre><div class="code-glow"></div></div>
</div></section>

<section class="section services" id="services"><div class="container"><div class="section-top"><div><div class="section-kicker">{u['services_kicker']}</div><h2>{u['services_title']}</h2></div><p>{u['services_sub']}</p></div><div class="service-grid">{''.join(service_card(s,i,lang,profile) for i,s in enumerate(services))}</div></div></section>

<section class="section work" id="work"><div class="container"><div class="section-top"><div><div class="section-kicker">{u['work_kicker']}</div><h2>{u['work_title']}</h2></div><a class="text-link" href="#contact">{u['view_all']}</a></div>
<div class="work-grid">''')
    if project:
        proof=project.get('proof',[])
        stats=''.join(f'<div><b>{e(x.get("value",""))}</b><span>{e(tr(x.get("label"),lang))}</span></div>' for x in proof[:3])
        out.append(f'''<article class="case-card"><div class="case-head"><span>01</span><span>{e(project.get('year',''))} · {e(tr(project.get('kind',''),lang))}</span></div><h3>{e(project.get('title',''))}</h3><p>{e(tr(project.get('summary'),lang))}</p><div class="case-stats">{stats}</div><a class="text-link" href="{base}p/{e(project['slug'])}.html">{u['read_case']}</a></article>''')
        out.append('''<article class="case-card dark-card"><div class="case-head"><span>STACK</span><span>Telegram · Python · payments</span></div><div class="terminal-mini"><div><span>$</span> python bot.py</div><div><span>✓</span> payments verified</div><div><span>✓</span> access updated</div><div><span>✓</span> logs written</div></div><p>Clean implementation, testing and handover are part of the delivery rather than an extra.</p></article>''')
    out.append('''</div></div></section>\n''')
    out.append(f'''<section class="section how" id="how"><div class="container"><div class="section-top"><div><div class="section-kicker">{u['how_kicker']}</div><h2>{u['how_title']}</h2></div><p>{u['how_sub']}</p></div><div class="steps">
<div class="step"><b>01</b><h3>{'Send the task' if lang=='en' else 'Опишите задачу'}</h3><p>{'Describe what needs to happen and what outcome you want.' if lang=='en' else 'Расскажите, что должно происходить и какой результат нужен.'}</p></div>
<div class="step"><b>02</b><h3>{'Get price + timeline' if lang=='en' else 'Цена + срок'}</h3><p>{'I confirm scope and give a fixed estimate before development.' if lang=='en' else 'Фиксирую объём и даю фиксированную оценку до разработки.'}</p></div>
<div class="step"><b>03</b><h3>{'Development & testing' if lang=='en' else 'Разработка и тесты'}</h3><p>{'Build, test the core flow and keep you updated in writing.' if lang=='en' else 'Собираю систему, тестирую основной сценарий и пишу обновления.'}</p></div>
<div class="step"><b>04</b><h3>{'Delivery & handover' if lang=='en' else 'Передача'}</h3><p>{'Working system, source code and the information needed to run it.' if lang=='en' else 'Готовая система, исходники и всё нужное для запуска.'}</p></div>
</div></div></section>

<section class="section faq" id="faq"><div class="container faq-grid"><div><div class="section-kicker">{u['faq_kicker']}</div><h2>{u['faq_title']}</h2></div><div class="faq-list">''')
    for q,a in zip(u['details'],u['answers']): out.append(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>')
    out.append(f'''</div></div></section>
<section class="cta-section" id="contact"><div class="container cta"><div><div class="section-kicker">{u['cta_kicker']}</div><h2>{u['cta_title']}</h2><p>{u['cta_sub']}</p></div><div class="cta-actions"><a class="button button-white" href="{e(contact_href(profile))}">{u['telegram']} <span>→</span></a><a class="button button-outline" href="mailto:{e(profile.get('contacts',{}).get('email',''))}">{u['email']} <span>→</span></a></div></div></section></main>''')
    out.append(footer(lang,base,profile))
    return ''.join(out)


def project_page(project, lang, profile):
    u=UI[lang]; base='../' if lang=='en' else '../../'
    # Project pages use the same visual language as VFinal with a longer detail layout.
    title=f"{project['title']} — OrbitDev"; desc=tr(project.get('subtitle'),lang)
    out=[head(title,desc,lang,base)]
    out.append(nav(lang,base))
    tags=' '.join(f'<span class="tag">{e(t)}</span>' for t in project.get('tags',[]))
    proof=''.join(f'<div><b>{e(x.get("value",""))}</b><span>{e(tr(x.get("label"),lang))}</span></div>' for x in project.get('proof',[]))
    out.append(f'''<main><section class="project-hero"><div class="container"><a class="text-link" href="{base}index.html#work">{u['page_back']}</a><div class="project-kicker">{e(project.get('year',''))} · {e(tr(project.get('kind',''),lang))}</div><h1>{e(project.get('title',''))}</h1><p class="project-lead">{e(tr(project.get('subtitle'),lang))}</p><div class="tag-row">{tags}</div></div></section>
<section class="section project-summary"><div class="container project-grid"><article class="case-card"><div class="section-kicker">SUMMARY</div><h2>{e(tr(project.get('summary'),lang))}</h2></article><aside class="case-card dark-card"><div class="section-kicker">{u['proof'].upper()}</div><div class="case-stats project-stats">{proof}</div></aside></div></section>
<section class="section"><div class="container detail-grid"><div><div class="section-kicker">{u['problem'].upper()}</div><h2>{e(u['problem'])}</h2></div><article class="detail-copy"><p>{e(tr(project.get('problem'),lang))}</p></article></div></section>
<section class="section how"><div class="container"><div class="section-top"><div><div class="section-kicker">{u['approach'].upper()}</div><h2>{e(u['approach'])}</h2></div></div><div class="approach-grid">''')
    for i,item in enumerate(project.get('approach',[]),1): out.append(f'<article class="step"><b>{i:02d}</b><h3>{e(tr(item.get("title"),lang))}</h3><p>{e(tr(item.get("body"),lang))}</p></article>')
    out.append('</div></div></section>')
    out.append(f'''<section class="section"><div class="container detail-grid"><div><div class="section-kicker">{u['delivers'].upper()}</div><h2>{e(u['delivers'])}</h2></div><ul class="detail-list">''')
    for item in project.get('delivers',[]): out.append(f'<li>{e(tr(item,lang))}</li>')
    out.append('</ul></div></section>')
    out.append(f'''<section class="section faq"><div class="container detail-grid"><div><div class="section-kicker">{u['honesty'].upper()}</div><h2>{e(u['honesty'])}</h2></div><article class="detail-copy"><p>{e(tr(project.get('honesty'),lang))}</p></article></div></section>''')
    out.append(f'''<section class="cta-section"><div class="container cta"><div><div class="section-kicker">{u['cta_kicker']}</div><h2>{u['cta_title']}</h2><p>{u['cta_sub']}</p></div><div class="cta-actions"><a class="button button-white" href="{e(contact_href(profile))}">{u['telegram']} <span>→</span></a><a class="button button-outline" href="mailto:{e(profile.get('contacts',{}).get('email',''))}">{u['email']} <span>→</span></a></div></div></section></main>''')
    out.append(footer(lang,base,profile))
    return ''.join(out)


def sitemap(profile, projects):
    base=(profile.get('site',{}).get('url') or 'https://YOUR_GITHUB_USERNAME.github.io').rstrip('/')
    urls=[base+'/',base+'/ru/']
    for p in projects:
        urls += [base+f"/p/{p['slug']}.html", base+f"/ru/p/{p['slug']}.html"]
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ''.join(f'<url><loc>{e(x)}</loc></url>' for x in urls) + '</urlset>\n'


def main():
    profile=load_profile(); projects=load_projects()
    shutil.rmtree(DIST,ignore_errors=True)
    (DIST/'ru').mkdir(parents=True)
    (DIST/'p').mkdir(parents=True)
    (DIST/'ru'/'p').mkdir(parents=True)
    shutil.copy2(STATIC/'style.css',DIST/'style.css')
    (DIST/'index.html').write_text(render_index('en',profile,projects),encoding='utf-8')
    (DIST/'ru'/'index.html').write_text(render_index('ru',profile,projects),encoding='utf-8')
    for p in projects:
        (DIST/'p'/f"{p['slug']}.html").write_text(project_page(p,'en',profile),encoding='utf-8')
        (DIST/'ru'/'p'/f"{p['slug']}.html").write_text(project_page(p,'ru',profile),encoding='utf-8')
    (DIST/'sitemap.xml').write_text(sitemap(profile,projects),encoding='utf-8')
    (DIST/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+((profile.get('site',{}).get('url') or 'https://YOUR_GITHUB_USERNAME.github.io').rstrip('/')+'/sitemap.xml')+'\n',encoding='utf-8')
    print('Generated', DIST)

if __name__=='__main__': main()
