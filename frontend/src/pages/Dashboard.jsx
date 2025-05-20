import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const userEmail = localStorage.getItem('userEmail'); // make sure this is stored during login

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/user/${userEmail}`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };

    fetchJobs();
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="mb-4">Welcome! You're logged in as <strong>{userEmail}</strong></p>
      <button onClick={handleLogout} className="mb-6 bg-red-500 text-white px-4 py-2 rounded">
        Log Out
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
