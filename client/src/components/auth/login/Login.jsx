import React, { useState } from 'react';
import { api } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/login', {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data.data[0];
      console.log('login res data ', access_token, refresh_token);

      // Store tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit"> Login </button>{' '}
      </form>
    </>
  );
};

export default Login;
