export default function JobCard({ job }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-lg font-semibold">{job.position} @ {job.company}</h3>
      <p className="text-sm text-gray-700 mt-1">{job.notes}</p>
      <p className="text-xs text-gray-400 mt-2">
        Added: {new Date(job.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
