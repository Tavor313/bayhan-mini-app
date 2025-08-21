import React from 'react';
import api from '../api';

export default function HistoryPage(){
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [exchanges, setExchanges] = React.useState<any[]>([]);
  React.useEffect(()=>{
    api.get('/api/bookings?mine=1').then(r=> setBookings(r.data));
    api.get('/api/exchanges').then(r=> setExchanges(r.data));
  },[]);
  return (<div className="card">
    <h2>История</h2>
    <h3>Бронирования</h3>
    <ul>{bookings.map(b=> <li key={b._id}>{b.year}-W{b.week} · {b.status}</li>)}</ul>
    <h3>Обмены</h3>
    <ul>{exchanges.map(x=> <li key={x._id}>{x.requesterTelegramId} → {x.targetTelegramId} · {x.status}</li>)}</ul>
    <div style={{marginTop:12}}><button className="btn" disabled>Экспорт PDF (скоро)</button></div>
  </div>);
}
