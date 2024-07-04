import 'bootstrap/dist/css/bootstrap.min.css';
import './brandBar.css';
import loginIcon from './login.png';
import contactIcon from '../../imgs/contact.png';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const BrandBar = () => {
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState('hidden');
  const handleLogout = () => {
    if (isAuthenticated()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return navigate('/');
    }
  };
  const showDropDown = () => {
    if (isVisible === 'drop') setVisible('hidden');
    else setVisible('drop');
  };
  return (
    <nav className="logbar">
      <div className="brand">MyBrand</div>
      <div className="nav-links"></div>
      <div id="logIco">
        <div className="login-drop">
          <img
            src={loginIcon}
            alt="sign in"
            className="login-icon"
            width="46px"
            onClick={showDropDown}
          />
          <img src={contactIcon} alt="contact-us" className="contact" />
        </div>
        <div className={isVisible}>
          <ul>
            {!isAuthenticated() && (
              <>
                <Link to="/login" className='log-opt'>
                  <li>Login</li>
                </Link>
                <Link to="/register" className='log-opt'>
                  <li>Register</li>
                </Link>
              </>
            )}
            <li>Settings</li>
            {isAuthenticated() && (
              <li onClick={handleLogout}> 
                  Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
