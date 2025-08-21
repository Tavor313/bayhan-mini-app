import React from 'react';
import api from '../api'; import { useTranslation } from 'react-i18next';

export default function HomePage(){
  const { t } = useTranslation();
  const [props, setProps] = React.useState<any[]>([]);
  React.useEffect(()=>{ api.get('/api/properties/mine').then(r=> setProps(r.data)).catch(()=> setProps([])); },[]);
  return (<div className="grid">
    <div className="card">
      <h2>{t('my_properties')}</h2>
      {props.map(p=>(
        <div key={p._id} style={{marginBottom:12}}>
          <h3 style={{marginBottom:6}}>{p.title}</h3>
          <div className="gallery">{(p.gallery||[]).slice(0,4).map((u:string,idx:number)=> <img key={idx} src={u} />)}</div>
          <div className="small" style={{marginTop:8}}>
            {t('rooms')}: {p.rooms} · {t('area')}: {p.area} м² · {p.address}
          </div>
          <div style={{display:'flex',gap:8, marginTop:8}}>
            <a className="btn" href="/book"> {t('book')} </a>
            <a className="btn" href="/exchange"> {t('exchange')} </a>
          </div>
        </div>
      ))}
      {props.length===0 && <div className="small">Нет привязанных объектов. Используйте сидинг или добавьте через администратора.</div>}
    </div>
  </div>);
}
