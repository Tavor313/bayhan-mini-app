import Button from '../components/Button';
export default function HomeScreen() {
  return (
    <div className="p-4">
      <h1 className="text-xl">Welcome to Bayhan</h1>
      <Button label="Book Now" onClick={() => alert('Booking')} />
    </div>
  );
}