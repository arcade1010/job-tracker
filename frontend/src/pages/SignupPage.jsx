import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // auto direct to dashboard if already logged in.
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/dashboard');
      }
    }, []); // empty array = only runs once (on mount)

  // Signup Logic
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Signup successful:', data);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />
          <button type="submit">Sign Up</button>
        </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Already have an account? <a href="/">Log in</a></p>
    </div>
  );
}
