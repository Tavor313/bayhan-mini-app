import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000' });
export function setTelegramInitData(initData?: string){ if (initData) api.defaults.headers.common['X-TG-Init-Data'] = initData }
export default api;
