import React, { useState } from 'react';
import { api } from '../../../api/axios';
import './login.css';
import ban from '../../../imgs/lgin.png';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const [error, setError] = useState(null);

  const toggleVisibility = (e) => {
    setIsPassword(!isPassword);
  }

  
  const roleLinks = {
    'delivery_boy': '/delivery-orders',
    'client': '/',
    'merchant': '/list-merchant-products',
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/login', {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data.data[0];
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      const role = jwtDecode(access_token).role;
      console.log(role)
      navigate(roleLinks[role]);
    } catch (err) {
      setError(err.response.data.message[0].msg ? err.response.data.message[0].msg : err.response.data.message);
      console.error('Login failed:', err);
    }
  };

  return (
    <div className='login-form flex'>
      {/* <div className='relative overflow-hidden w-full'> */}
      <img src={ban} alt='Company pic' className='w-11/12 h-full ml-40' />
      {/* </div> */}
      <div className='form-div'>
        <form onSubmit={handleLogin}>
          <div className='s-in-head mb-20 items-center'>Welcome to
            <p className='text-6xl ml-2 text-violet-600 flex items-center'>Gamma</p>
          </div>
          <div className='fields'>
            <div>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@provider.com"
              />
            </div>
            <div className='ico-par'>
              <i className='pass-ico'></i>
              <input
                type={isPassword ? 'password' : 'text'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="lgn-inp"
              />
              <i className='eye-ico' onClick={toggleVisibility}></i>
            </div>
          </div>
          {error ? (
            <div className='lgin-err-div'>{error}</div>
          ) : null}
          <div className='btn-div'>
            <button type="submit" className='sub-button'> Login </button>
          </div>
          <div className='opts'>
            <Link to='/register' className='link'>create an account</Link>
            <Link to='' className='link'>forgot password ?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
