import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import AddJobForm from '../components/AddJobForm';

export default function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const userEmail = localStorage.getItem('userEmail'); // make sure this is stored during login

  const fetchJobs = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs/user/${userEmail}`);
          const data = await res.json();
          setJobs(data);
        } catch (err) {
          console.error('Failed to fetch jobs:', err);
        }
      };

  useEffect(() => {
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

       {/* Add Job Button */}
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Job
      </button>
      {/* Modal with AddJobForm */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Job</h3>
            <AddJobForm
              userEmail={userEmail}
              onJobAdded={() => {
                setShowForm(false);
                fetchJobs();
              }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
