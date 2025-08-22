# Bayhan Mini-App (Telegram WebApp)

Функционал: бронирования по ротации (Pacaso-like), обмен неделями, история, профиль, уведомления через Telegram.

Стек: 
- Frontend: React (Vite) + Telegram WebApp API, React Router, react-calendar, date-fns, i18next, leaflet, jsPDF, socket.io-client, Tailwind CSS.
- Backend: Node/Express, MongoDB (Mongoose), Telegraf (Telegram Bot API), Socket.io, JWT, crypto (AES).
- Notifications: Telegraf для алертов с inline-кнопками.
- Deployment: Docker Compose (frontend, backend, mongo, bot).

### Привязка к Telegram
- В BotFather задайте Web App URL = ваш фронтенд URL.
- Auth: initData → backend HMAC check + JWT.
- Notifications: Bot отправляет сообщения с кнопками (ссылки на приложение).

## Сидинг демо-данных
`curl -X POST http://localhost:4000/api/admin/seed` (только в dev).

## Admin (Bot Commands)
- /manage_users: Список пользователей, edit.
- /manage_properties: Добавление/редактирование объектов.
- /moderate_bookings: Просмотр/approve/deny.
- Только для admin Telegram IDs (в .env: ADMIN_IDS=123456,789012).

## Security
- PII encrypted with AES-256-GCM.
- Unique index on bookings: {property, year, week}.
- Holidays: isHoliday=true → pending status.

## Localization
- Russian (default), English. Toggle in profile.
