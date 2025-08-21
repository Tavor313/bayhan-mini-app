import dotenv from 'dotenv'; dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { errorHandler } from './middleware/error.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import propertiesRouter from './routes/properties.js';
import bookingsRouter from './routes/bookings.js';
import exchangesRouter from './routes/exchanges.js';
import notificationsRouter from './routes/notifications.js';
import adminRouter from './routes/admin.js';

const app = express();
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('tiny'));
import authRouter from "./routes/auth.js";
app.use("/api/auth", authRouter);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bayhan';
await mongoose.connect(MONGO_URI);

app.get('/health', (req,res)=> res.json({ ok:true, ts: Date.now() }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/exchanges', exchangesRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('API listening on', PORT));
