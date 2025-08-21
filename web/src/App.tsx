import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage'; import BookingPage from './pages/BookingPage';
import ExchangePage from './pages/ExchangePage'; import HistoryPage from './pages/HistoryPage'; import ProfilePage from './pages/ProfilePage';
import { useTranslation } from 'react-i18next'; import api, { setTelegramInitData } from './api';

declare global { interface Window { Telegram:any } }

export default function App(){
  const { t } = useTranslation();
  React.useEffect(()=>{
    const tg = window.Telegram?.WebApp;
    if (tg?.initData){ setTelegramInitData(tg.initData); tg.expand(); }
  },[]);

  return (<div>
    <header className="header card">
      <b>Bayhan</b>
      <nav className="nav">
        <Link to="/">{t('home')}</Link>
        <Link to="/book">{t('book')}</Link>
        <Link to="/exchange">{t('exchange')}</Link>
        <Link to="/history">{t('history')}</Link>
        <Link to="/profile">{t('profile')}</Link>
      </nav>
    </header>
    <main className="container grid">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/book" element={<BookingPage/>}/>
        <Route path="/exchange" element={<ExchangePage/>}/>
        <Route path="/history" element={<HistoryPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </main>
  </div>);
}
