# Bayhan Mini‑App (Telegram WebApp)
Функционал: бронирования по ротации, обмен неделями, история, профиль, уведомления через Telegram.  
Стек: React (Vite) + Telegram WebApp API, Node/Express, MongoDB (Mongoose), Telegraf.

## Запуск (Docker)
1) Скопируйте `.env.example` → `.env`, заполните токены/ключи.
2) `docker compose up --build -d`
3) WebApp (dev-просмотр): http://localhost:5173  
   API: http://localhost:4000/health

### Привязка к Telegram
- В BotFather задайте `Web App` URL = фронтенд URL.
- Внутри Telegram WebApp будет передавать `initData` → бэкенд проверяет HMAC.

## Сидинг демо-данных
`curl -X POST http://localhost:4000/api/admin/seed` (NODE_ENV != production).

## Примечания
- PII (email/phone) шифруются AES-256-GCM (ключ `DATA_ENC_KEY`).
- Уникальный индекс брони `{property,year,week}` предотвращает двойное бронирование.
- Праздничные недели помечаются `isHoliday=true` → статус заявки `pending` для модерации.
