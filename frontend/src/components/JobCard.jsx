import React from 'react';

export default function JobCard({ job, fetchJobs }) {
  //Delete Job stuff
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (!confirmed) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs/${job._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchJobs(); // refresh job list after deletion
      } else {
        console.error('Failed to delete job');
      }
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded mb-4">
      <h2 className="text-xl font-bold">{job.company}</h2>
      <p className="text-gray-600">{job.position}</p>
      <p className="text-sm text-gray-500">{job.notes}</p>

      <button
        onClick={handleDelete}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
