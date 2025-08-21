import React from 'react';
import { DayPicker } from 'react-day-picker'; import 'react-day-picker/dist/style.css';
import api from '../api';

export default function BookingPage(){
  const [selected, setSelected] = React.useState<Date | undefined>();
  const [propertyId, setPropertyId] = React.useState<string>('');
  const [props, setProps] = React.useState<any[]>([]);
  const [msg, setMsg] = React.useState<string>('');

  React.useEffect(()=>{ api.get('/api/properties/mine').then(r=> setProps(r.data)); },[]);

  async function createBooking(){
    if (!selected || !propertyId) return;
    const dt = new Date(selected); // naive ISO week approx (client-side demo); backend проверит eligibility
    const tmp = new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()));
    const onejan = new Date(Date.UTC(tmp.getUTCFullYear(),0,1));
    const week = Math.ceil((((tmp - onejan) / 86400000) + onejan.getUTCDay()+1) / 7);
    const year = tmp.getUTCFullYear();
    try {
      const { data } = await api.post('/api/bookings', { propertyId, year, week });
      setMsg('OK: ' + data.status);
    } catch(e:any){ setMsg('Ошибка: ' + (e.response?.data?.error || e.message)); }
  }

  return (<div className="card">
    <h2>Календарь бронирования</h2>
    <select className="input" value={propertyId} onChange={e=> setPropertyId(e.target.value)} style={{marginBottom:8}}>
      <option value="">Выберите объект</option>
      {props.map(p=> <option key={p._id} value={p._id}>{p.title}</option>)}
    </select>
    <DayPicker mode="single" selected={selected} onSelect={setSelected} />
    <div style={{marginTop:12}}>
      <button className="btn" disabled={!selected || !propertyId} onClick={createBooking}>Отправить заявку</button>
    </div>
    {msg && <div className="small" style={{marginTop:8}}>{msg}</div>}
  </div>);
}
