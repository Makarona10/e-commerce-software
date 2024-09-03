import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import cart from '../../imgs/cart.png';
import acc from '../../imgs/login.png';
import { NavLink, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../api/axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/isAuthenticated';

export const Nav_bar = (props) => {
  const [cartList, setCartList] = useState({ address: '', products: [] });
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // State for the dropdown menu
  const [role, setRole] = useState(null);
  const [links, setLinks] = useState({
    'Home': '/',
    'Stores': '&',
    'Best sellers': '@',
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    if (isAuthenticated()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    }
  };

  const stripePromise = loadStripe('pk_test_51PWn2V2LcWJtaPbbBrpvPUeP2GHUvybeLln5FxrzbDIibAWW6q6SSjTQRLxpic9rrkuqnpQLPZzwerl5AMSa5j0I00EU1W1vj3');
  let theToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (theToken) {
      const decodedToken = jwtDecode(theToken);
      setRole(decodedToken.role);
    }
  }, [theToken]);

  useEffect(() => {
    if (role === 'merchant') {
      setLinks({
        'STORE PRODUCTS': '/list-merchant-products',
        'MOST SOLD': '/merchant-best-sellers',
        'STORE INFO': '/store-info',
      });
    } else if (role === 'client') {
      setLinks({
        'HOME': '/',
        'TRENDING': '/trend',
        'LATEST': '/trend',
        'OFFERS': '/offers',
        'ORDERS': '/orders-history',
      });
    } else if (role === 'delivery_boy') {
      setLinks({
        'ASSIGNED ORDERS': '/delivery-orders',
        'PENDING': '/pending',
      });
    }
  }, [role]);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible); // Toggle the dropdown menu
  };

  useEffect(() => {
    setCartList({
      address: 'Meet-okba',
      products: localStorage.getItem('cartList')
        ? JSON.parse(localStorage.getItem('cartList'))
        : [],
    });
  }, [localStorage.getItem('cartList')]);

  const handleCheckout = async () => {
    const response = await api.post('customer', cartList);
    if (response.status === 200) {
      window.location.href = response.data.sessionUrl;
      navigate(response.data.sessionUrl);
    } else {
      window.location.href = 'www.google.com';
    }
    const session = response;
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.log('Checkout failed!', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="brand">MyBrand</div>
      <div className="navbar-links">
        {Object.keys(links).map((link, idx) => (
          <NavLink exact to={Object.values(links)[idx]} key={idx} className="navbar-link">
            {link}
          </NavLink>
        ))}
      </div>

      <div className="cart-logo">
        <img src={cart} alt="cart" width="32px" onClick={toggleCart} />
        <div className={isCartVisible ? 'cart-list' : 'hidden'}>
          {!cartList.products || cartList.products.length === 0 ? (
            <p>Cart is empty!</p>
          ) : (
            <div className="cart-items">
              <ul>
                {cartList.products.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className='crt-img'>
                      <img src={`http://localhost:3001/uploads/${item.image}`} />
                    </div>
                    <div className='crt-det'>
                      <div>{(item.product_name)}</div>
                      <div>
                        <button className='crt-btn inc'>+</button>
                        {item.quantity}
                        <button className='crt-btn dec'>-</button>
                      </div >
                      <div>${item.quantity * item.price}</div>
                    </div>

                  </li>
                ))}
              </ul>
              <div className="btn-container">
                <button className="checkout" onClick={handleCheckout}>
                  checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="acc_logo">
        <img
          src={acc}
          alt="sign in"
          className="login-icon"
          width="46px"
          onClick={toggleMenu} // Toggle the dropdown menu
        />
      </div>

      <div className={`drop ${isMenuVisible ? 'show' : ''}`}>
        <ul>
          {!isAuthenticated() && (
            <>
              <Link to="/login" className="log-opt">
                <li>Login</li>
              </Link>
              <Link to="/register" className="log-opt">
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

      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};
