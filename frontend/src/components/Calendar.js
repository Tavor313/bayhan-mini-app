import Calendar from 'react-calendar';
export default function CustomCalendar({ value, onChange }) {
  return <Calendar value={value} onChange={onChange} />;
}