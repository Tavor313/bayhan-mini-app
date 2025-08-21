import React from 'react';
import api from '../api';

export default function ExchangePage(){
  const [myBookings, setMyBookings] = React.useState<any[]>([]);
  const [props, setProps] = React.useState<any[]>([]);
  const [requesterBookingId, setRequesterBookingId] = React.useState('');
  const [targetPropertyId, setTargetPropertyId] = React.useState('');
  const [year, setYear] = React.useState('2025');
  const [week, setWeek] = React.useState('1');
  const [targetTelegramId, setTargetTelegramId] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [resp, setResp] = React.useState('');

  React.useEffect(()=>{
    api.get('/api/bookings?mine=1').then(r=> setMyBookings(r.data));
    api.get('/api/properties/mine').then(r=> setProps(r.data));
  },[]);

  async function submit(){
    try {
      const { data } = await api.post('/api/exchanges', { requesterBookingId, targetPropertyId, year: Number(year), week: Number(week), targetTelegramId: Number(targetTelegramId), message });
      setResp('Создано: ' + data._id);
    } catch(e:any){ setResp('Ошибка: ' + (e.response?.data?.error || e.message)); }
  }

  return (<div className="card">
    <h2>Обмен неделями</h2>
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <div>
        <div className="small">Моя неделя</div>
        <select className="input" value={requesterBookingId} onChange={e=> setRequesterBookingId(e.target.value)}>
          <option value="">Выберите</option>
          {myBookings.map(b=> <option key={b._id} value={b._id}>{b.year}-W{b.week}</option>)}
        </select>
      </div>
      <div>
        <div className="small">Целевой объект</div>
        <select className="input" value={targetPropertyId} onChange={e=> setTargetPropertyId(e.target.value)}>
          <option value="">Выберите</option>
          {props.map(p=> <option key={p._id} value={p._id}>{p.title}</option>)}
        </select>
      </div>
      <div>
        <div className="small">Год</div>
        <input className="input" value={year} onChange={e=> setYear(e.target.value)} />
      </div>
      <div>
        <div className="small">Неделя</div>
        <input className="input" value={week} onChange={e=> setWeek(e.target.value)} />
      </div>
    </div>
    <div className="small" style={{marginTop:8}}>Telegram ID второго владельца</div>
    <input className="input" value={targetTelegramId} onChange={e=> setTargetTelegramId(e.target.value)} placeholder="например, 222" />
    <div className="small" style={{marginTop:8}}>Сообщение (необязательно)</div>
    <textarea className="input" rows={3} value={message} onChange={e=> setMessage(e.target.value)} />
    <div style={{marginTop:12}}><button className="btn" onClick={submit} disabled={!requesterBookingId || !targetPropertyId || !year || !week || !targetTelegramId}>Отправить заявку</button></div>
    {resp && <div className="small" style={{marginTop:8}}>{resp}</div>}
  </div>);
}
