# npchelina.ru — Портфолио сайт

## Структура файлов

```
/
├── index.html              ← Главная страница
├── portfolio.html          ← Страница всех проектов с фильтрами
├── project.html            ← Шаблон страницы проекта (читает ?id= из URL)
├── services.html           ← Страница услуг с формой запроса
├── price.html              ← Страница прайса с формой запроса
├── resume.html             ← Страница резюме
├── privacy.html            ← Политика конфиденциальности (RU/EN/ZH)
├── process.html            ← Как мы работаем (RU/EN/ZH)
├── projects.js             ← Данные всех проектов (РЕДАКТИРОВАТЬ ЗДЕСЬ)
├── favicon.svg             ← Иконка сайта
├── hero-animation.html     ← Служебный: анимация для главной (не редактировать)
├── price_list_patterns.html← Служебный: черновик прайс-листа (не редактировать)
├── portfolio/
│   └── img/
│       └── ИмяПроекта/    ← Папка с фото проекта
│           ├── 01.jpg
│           ├── 02.jpg
│           └── ...
├── examples/               ← PDF-примеры работ для карточек услуг (создай если нет)
├── price-ru.pdf            ← Прайс на русском
├── price-en.pdf            ← Прайс на английском
├── price-zh.pdf            ← Прайс на китайском
├── resume-ru.pdf           ← Резюме на русском
├── resume-en.pdf           ← Резюме на английском
└── resume-zh.pdf           ← Резюме на китайском
```

---

## Как добавить новый проект

### 1. Добавь фото
Создай папку `portfolio/img/название-проекта/` и положи туда фото:
- `01.jpg`, `02.jpg`, `03.jpg` и т.д.
- Формат: JPG/PNG, соотношение сторон 4:3 идеально, минимум 800px шириной
- Первое фото (`01.jpg`) — главное, оно отображается на карточке

### 2. Добавь проект в `projects.js`
Скопируй один из существующих объектов и заполни:

```javascript
{
  id: 'уникальное-id',             // латиница, дефисы вместо пробелов
  ru: { title: 'Название RU', desc: 'Описание на русском' },
  en: { title: 'Title EN', desc: 'Description in English' },
  zh: { title: '中文标题', desc: '中文描述' },
  tags: ['тег1', 'тег2'],          // теги на русском
  tags_en: ['tag1', 'tag2'],       // теги на английском
  tags_zh: ['标签1', '标签2'],      // теги на китайском
  photos: [
    'portfolio/img/уникальное-id/01.jpg',
    'portfolio/img/уникальное-id/02.jpg',
  ],
  year: '2025',
  client: 'Название клиента',
  services_ru: ['Услуга 1', 'Услуга 2'],
  services_en: ['Service 1', 'Service 2'],
  services_zh: ['服务1', '服务2'],
  color: '#A09080',  // цвет акцента для проекта (опционально)
},
```

### 3. Сохрани → запушь на GitHub
```bash
git add .
git commit -m "add project: название"
git push
```
Сайт обновится автоматически через GitHub Pages.

---

## Обновление прайса / резюме

Каждый документ существует в трёх языковых версиях. Замени нужный файл с тем же именем:

| Документ | Файлы |
|----------|-------|
| Прайс    | `price-ru.pdf`, `price-en.pdf`, `price-zh.pdf` |
| Резюме   | `resume-ru.pdf`, `resume-en.pdf`, `resume-zh.pdf` |

Push на GitHub — готово. Кнопка скачивания на сайте автоматически отдаёт нужный язык.

---

## Formspree

Форма обратной связи используется на **трёх страницах**: `index.html`, `services.html`, `price.html`.

На каждой из них найди строку:
```
action="https://formspree.io/f/YOUR_FORM_ID"
```
Замени `YOUR_FORM_ID` на твой реальный ID из аккаунта [formspree.io](https://formspree.io). ID одинаковый для всех трёх файлов.

---

## GitHub Actions (автоматизация — следующий этап)

Планируется агент, который:
- Читает папку `portfolio/img/` и автоматически добавляет новые проекты в `projects.js`
- Читает прайс из Google Sheets и генерирует `price.pdf`
- Отправляет уведомление в Telegram при новой заявке

Это подключается отдельно через `.github/workflows/`.

---

## Контакты и соцсети

Обновляются в `index.html`, ищи блок `<!-- SOCIAL LINKS -->` или секцию `contact-left`.

| Платформа | Текущая ссылка |
|-----------|---------------|
| Telegram  | https://t.me/npchel |
| WhatsApp  | https://wa.me/79036040666 |
| Behance   | https://www.behance.net/natalyapchelina |
| Pinterest | https://ru.pinterest.com/NPchelina |
| LinkedIn  | https://www.linkedin.com/in/npchelina |
| Email     | npchel93@gmail.com |

---

## Примеры работ в карточках услуг

Кнопка «Посмотреть пример работы» появляется в модалке каждой услуги.
Файлы кладутся в папку `examples/` (создай если нет):

| Услуга | Файл |
|--------|------|
| Дизайн изделия | `examples/design.pdf` |
| Технический эскиз | `examples/tech-sketch.pdf` |
| Технический дизайн | `examples/tech-design.pdf` |
| Лекала | `examples/pattern.pdf` |
| Тех пак | `examples/tech-pack.pdf` |
| 3D-примерка | `examples/3d-fitting.pdf` |
| 3D + видео | `examples/3d-video.pdf` |
| AI-фотосессия | `examples/ai-photo.pdf` |
| Подбор материалов | `examples/material-sourcing.pdf` |
| Ведение проекта | `examples/project-management.pdf` |

Добавь PDF файл с нужным именем → push на GitHub → кнопка появится автоматически.
