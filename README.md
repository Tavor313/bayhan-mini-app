# Bayhan Mini-App (Telegram WebApp)

Функционал: бронирования по ротации (Pacaso-like), обмен неделями, история, профиль, уведомления через Telegram.

Стек: 
- Frontend: React (Vite) + Telegram WebApp API, React Router, react-calendar, date-fns, i18next, leaflet, jsPDF, socket.io-client, Tailwind CSS.
- Backend: Node/Express, MongoDB (Mongoose), Telegraf (Telegram Bot API), Socket.io, JWT, crypto (AES).
- Notifications: Telegraf для алертов с inline-кнопками.
- Deployment: Docker Compose (frontend, backend, mongo, bot).

## Запуск (Docker)
0. Скопируйте `.env.example` → `.env`, заполните: TELEGRAM_BOT_TOKEN, MONGO_URI=mongodb://mongo:27017/bayhan, DATA_ENC_KEY (32-byte hex for AES), JWT_SECRET, SOCKET_PORT=4001, etc.
1. `docker compose up --build -d`
2. WebApp (dev): http://localhost:5173 (в Telegram укажите как WebApp URL).
   API: http://localhost:4000/health
   Bot: Запустите в Telegram с /start.

### Привязка к Telegram
- В BotFather задайте Web App URL = ваш фронтенд URL.
- Auth: initData → backend HMAC check + JWT.
- Notifications: Bot отправляет сообщения с кнопками (ссылки на app).

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

## Testing
- Unit: `cd frontend && npm test` (Jest).
- E2E: `cd frontend && npx cypress run` (stubs).

## API Docs (Basic)
- GET /api/properties: List properties.
- POST /api/bookings/create: Create booking (auth required).
- More in routes/api.js.

## Edge Cases
- Date conflicts: Backend validation.
- Offline: LocalStorage for drafts.
- Real-time: Socket.io for exchange updates.


For growth: Indexes on dates in Mongoose.
