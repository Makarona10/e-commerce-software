import React, { useState } from 'react';
import { api } from '../../../api/axios.js';
import { useAsyncError, useNavigate } from 'react-router-dom';
import './register.css';
import { BrandBar } from '../../brandBar/brandBar.js'
import { Nav_bar } from '../../Navbar/Navbar.js'


const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    user_type: userType,
    email: '',
    password: '',
    password_confirmation: '',
    mobile: '',
    first_name: '',
    last_name: '',
    store_name: '',
    location: '',
    national_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      navigate('/login');
      console.log('regiter', response);
    } catch (err) {
      setError(err.response.data.message ? err.response.data.message : err.response.data.errors[0].msg);
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className='reg-body'>
      <BrandBar />
      <Nav_bar />
      <div className='reg-div'>
        <div className='reg-hd'>Create a new account</div>
        <form onSubmit={handleRegister}>
          <div className='label-div1'>
            <select
              name="user_type"
              id='sel-type'
              onChange={(e) => {
                handleChange(e);
                setUserType(e.target.value);
              }}
            >
              <option>Select a user type</option>
              <option value="client">Client</option>
              <option value="merchant">Merchant</option>
              <option value="delivery_boy">Delivery Boy</option>
            </select>
          </div>
          {(userType === 'client' || userType === 'delivery_boy') && (
            <div>
              <div className='reg-inpts'>
                <input
                  placeholder='First Name'
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  
                />
              </div>
              <div className='reg-inpts'>
                <input
                  type="text"
                  name="last_name"
                  placeholder='Last Name'
                  value={formData.last_name}
                  onChange={handleChange}
                  
                />
              </div>
            </div>
          )}
          <div className='reg-inpts'>
            <input
              placeholder='Phone'
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              
            />
          </div>

          <div className='reg-inpts'>
            <input
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              
            />
          </div>

          <div className='reg-inpts'>
            <input
              placeholder='Password'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              
            />
          </div>

          <div className='reg-inpts'>
            <input
              type="password"
              name="password_confirmation"
              placeholder='Password confirmation'
              value={formData.password_confirmation}
              onChange={handleChange}
              
            />
          </div>
          {userType === 'merchant' && (
            <>
              <div className='reg-inpts'>
                <input
                  type="text"
                  name="store_name"
                  placeholder='Store Name'
                  value={formData.store_name}
                  onChange={handleChange}
                  
                />
              </div>
              <div className='reg-inpts'>
                <input
                  type="text"
                  name="location"
                  placeholder='Location'
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {userType === 'delivery_boy' && (
            <>
              <div className='reg-inpts'>
                <input
                  type="text"
                  name="national_id"
                  placeholder='National ID'
                  value={formData.national_id}
                  onChange={handleChange}
                  
                />
              </div>
            </>
          )}
          {error ? (
            <div className='reg-err-div'>{error}</div>
           ) : ''
            }
          <div className='sb-reg'>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
