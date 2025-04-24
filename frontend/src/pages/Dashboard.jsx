import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // 🔐 clear token
    navigate('/'); // 🔁 redirect to login
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome! You're logged in.</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
