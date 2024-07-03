import React, { useState } from 'react';
import { api } from '../../../api/axios.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
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
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>User Type:</label>
        <select
          name="user_type"
          value={formData.user_type}
          onChange={(e) => {
            handleChange(e);
            setUserType(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="client">Client</option>
          <option value="merchant">Merchant</option>
          <option value="delivery_boy">Delivery Boy</option>
        </select>
      </div>
      {(userType === 'client' || userType === 'delivery_boy') && (
        <>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      <div>
        <label>Mobile:</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Password Confirmation</label>
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
      </div>
      {userType === 'merchant' && (
        <>
          <div>
            <label>Store Name:</label>
            <input
              type="text"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      {userType === 'delivery_boy' && (
        <>
          <div>
            <label>National ID:</label>
            <input
              type="text"
              name="national_id"
              value={formData.national_id}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
