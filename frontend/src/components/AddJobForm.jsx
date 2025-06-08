// frontend/src/components/AddJobForm.jsx
import { useState } from 'react';

export default function AddJobForm({ userEmail, onJobAdded }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    portalEmail: '',
    portalUsername: '',
    portalPassword: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      userEmail,
      timeline: [
        {
          type: 'applied',
          date: new Date(),
          note: 'Initial application'
        }
      ]
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      if (res.ok) {
        onJobAdded(); // to refresh job list if needed
        setFormData({
          company: '',
          position: '',
          portalEmail: '',
          portalUsername: '',
          portalPassword: '',
          notes: ''
        });
        alert('Job added!');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add job');
      }
    } catch (err) {
      console.error('Add job error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="company" value={formData.company} onChange={handleChange} required placeholder="Company" /><br />
      <input name="position" value={formData.position} onChange={handleChange} required placeholder="Position" /><br />
      <input name="portalEmail" value={formData.portalEmail} onChange={handleChange} placeholder="Portal Email" /><br />
      <input name="portalUsername" value={formData.portalUsername} onChange={handleChange} placeholder="Portal Username" /><br />
      <input name="portalPassword" value={formData.portalPassword} onChange={handleChange} type="password" placeholder="Portal Password" /><br />
      <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" /><br />
      <button type="submit">Add Job</button>
    </form>
  );
}
