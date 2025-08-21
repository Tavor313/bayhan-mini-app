import React from 'react';
import api from '../api'; import { useTranslation } from 'react-i18next';

export default function ProfilePage(){
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = React.useState<any>({});
  const [email, setEmail] = React.useState(''); const [phone, setPhone] = React.useState('');
  const [lang, setLang] = React.useState(i18n.language || 'ru');
  const [notif, setNotif] = React.useState({ booking:true, exchange:true });
  const [guests, setGuests] = React.useState<any[]>([]);
  const [msg, setMsg] = React.useState('');

  React.useEffect(()=>{
    api.get('/api/users/me').then(r=>{
      setProfile(r.data||{});
      setEmail(r.data?.email||''); setPhone(r.data?.phone||'');
      setLang(r.data?.language||'ru'); setNotif(r.data?.notifications||{booking:true,exchange:true});
      setGuests(r.data?.guests||[]);
      i18n.changeLanguage(r.data?.language||'ru');
    }).catch(()=>{});
  },[]);

  async function save(){
    try {
      const { data } = await api.patch('/api/users/me', { email, phone, language: lang, notifications: notif, guests });
      setMsg('Сохранено'); i18n.changeLanguage(data.language);
    } catch(e:any){ setMsg('Ошибка: ' + (e.response?.data?.error || e.message)); }
  }

  function addGuest(){ setGuests([...guests, { name:'', phone:'' }]) }
  function setGuest(i:number, key:'name'|'phone', val:string){
    const copy = guests.slice(); copy[i] = { ...copy[i], [key]: val }; setGuests(copy);
  }
  function removeGuest(i:number){ setGuests(guests.filter((_,idx)=> idx!==i)) }

  return (<div className="card">
    <h2>{t('profile')}</h2>
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <div><div className="small">{t('email')}</div><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div><div className="small">{t('phone')}</div><input className="input" value={phone} onChange={e=>setPhone(e.target.value)} /></div>
    </div>
    <div className="small" style={{marginTop:8}}>{t('language')}</div>
    <select className="input" value={lang} onChange={e=> setLang(e.target.value)}><option value="ru">Русский</option><option value="en">English</option></select>
    <div className="small" style={{marginTop:8}}>{t('notifications')}</div>
    <label className="small"><input type="checkbox" checked={notif.booking} onChange={e=> setNotif({...notif, booking: e.target.checked})}/> Бронирования</label>
    <label className="small" style={{marginLeft:8}}><input type="checkbox" checked={notif.exchange} onChange={e=> setNotif({...notif, exchange: e.target.checked})}/> Обмены</label>

    <h3 style={{marginTop:12}}>Гости</h3>
    {guests.map((g,i)=>(<div key={i} className="grid" style={{gridTemplateColumns:'1fr 1fr', marginBottom:6}}>
      <input className="input" placeholder="Имя" value={g.name||''} onChange={e=> setGuest(i,'name',e.target.value)} />
      <input className="input" placeholder="Телефон" value={g.phone||''} onChange={e=> setGuest(i,'phone',e.target.value)} />
      <div><button className="btn" onClick={()=> removeGuest(i)}>Удалить</button></div>
    </div>))}
    <button className="btn" onClick={addGuest}>Добавить гостя</button>

    <div style={{marginTop:12, display:'flex', gap:8}}>
      <button className="btn" onClick={save}>{t('save')}</button>
      <button className="btn" disabled>{t('export_pdf')}</button>
    </div>
    {msg && <div className="small" style={{marginTop:8}}>{msg}</div>}
  </div>);
}
