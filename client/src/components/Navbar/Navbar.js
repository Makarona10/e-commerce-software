import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import cart from '../../imgs/cart.png';
import acc from '../../imgs/login.png';
import acc_set from '../../imgs/acc-set.png';
import logout from '../../imgs/logout.png';
import log_in from '../../imgs/log_in.png';
import register from '../../imgs/register.png';
import logo from '../../imgs/g5.png';
import { NavLink, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../api/axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { addToCart, removeFromCart } from '../common/addToCart/addToCart';
import { updateCart } from '../common/addToCart/addToCart';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export const NavBar = () => {
  // const [cartList, setCartList] = useState({ address: '', products: JSON.parse[localStorage.getItem('cartList')] || []});
  const [cartList, setCartList] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [role, setRole] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('')
  const [links, setLinks] = useState({
    'HOME': '/',
    'STORES': '&',
    'BSET SELLERS': '@',
  });
  const navigate = useNavigate();

  const handleNavPosition = () => {
    if (window.scrollY >= 66) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

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
    window.addEventListener('scroll', handleNavPosition);
    return () => {
      window.removeEventListener('scroll', handleNavPosition);
    }
  }, [])

  useEffect(() => {
    console.log(cartList)
    if (theToken) {
      const decodedToken = jwtDecode(theToken);
      setRole(decodedToken.role);
    }
  }, [theToken]);

  const roleLinks = {
    'merchant': () => {
      setLinks({
        'STORE PRODUCTS': '/list-merchant-products',
        'MOST SOLD': '/merchant-best-sellers',
        'STORE INFO': '/store-info',
      })
    },
    'client': () => {
      setLinks({
        'HOME': '/',
        'TRENDING': '/view-prods?sort=trending&page=1',
        'LATEST': '/view-prods?sort=latest&page=1',
        'OFFERS': '/view-prods?sort=offers&page=1',
        'ORDERS': '/orders-history',
      })
    },
    'delivery_boy': () => {
      setLinks({
        'ASSIGNED ORDERS': '/delivery-orders',
        'PENDING': '/pending',
      })
    }
  }

  useEffect(() => {
    if (roleLinks[role]) {
      roleLinks[role]();
    }
  }, [role]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      const updatedCart = updateCart();
      setCartList(updatedCart);
    };
    handleCartUpdate();
    // window.addEventListener('storage', updateCart);
    // return () => {
    //   window.removeEventListener('storage', updateCart);
    // };
  }, [localStorage.getItem('cartList')]);

  const handleCheckout = async () => {
    const homeAddress = [city, district, street, building].join(' - ');
    console.log(homeAddress, cartList)
    const response = await api.post('customer', { address: homeAddress, products: cartList });
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
    <nav id='navbar' className={`navbar ${isSticky ? 'stick' : ''}`}>
      <div className="brand">
        <img src={logo} alt='Gamma' />
      </div>
      <div className="navbar-links">
        {Object.keys(links).map((link, idx) => (
          <NavLink exact to={Object.values(links)[idx]} key={idx} className="navbar-link">
            {link}
          </NavLink>
        ))}
      </div>

      <div className={`cart-logo ${role === 'client' ? '' : 'hidden'}`}
      >
        <div
          className='h-16 flex items-center justify-center'
          onMouseEnter={() => setIsCartVisible(true)}
          onMouseLeave={() => setIsCartVisible(false)}
        >
          <img src={cart} alt="cart" width="32px" />
        </div>

        <div
          className={`cart-list ${isCartVisible ? '' : 'hide'}`}
          onMouseEnter={() => setIsCartVisible(true)}
          onMouseLeave={() => setIsCartVisible(false)}
        >
          {!Array.isArray(cartList) || cartList.length === 0 ? (
            <p>Cart is empty!</p>
          ) : (
            <div className="cart-items">
              <ul>
                {cartList.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className='crt-img'>
                      <img src={`http://localhost:3001/uploads/${item.image}`} alt='product pic' />
                    </div>
                    <div className='crt-det'>
                      <div>{(item.product_name)}</div>
                      <div>
                        <button className='crt-btn inc' onClick={() => { addToCart(item); setCartList(updateCart()) }}>+</button>
                        {item.quantity}
                        <button className='crt-btn dec' onClick={() => { removeFromCart(item); setCartList(updateCart()) }}>-</button>
                      </div >
                      <div>${item.quantity * item.price}</div>
                    </div>

                  </li>
                ))}
              </ul>
              <div className="btn-container">
                <button className="checkout" onClick={() => setAddressModal(true)}>
                  checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        show={addressModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className='ml-16'>
            Fill the address information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='flex flex-col justify-center items-center w-full'>
          <input type='text' placeholder='City' className='adrs-inp' onChange={(e) => setCity(e.target.value)} required={true} />
          <input type='text' placeholder='District' className='adrs-inp' onChange={(e) => setDistrict(e.target.value)} required={true} />
          <input type='text' placeholder='Street' className='adrs-inp' onChange={(e) => setStreet(e.target.value)} required={true} />
          <input type='text' placeholder='Building NO.' className='adrs-inp' onChange={(e) => setBuilding(e.target.value)} required={true} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setAddressModal(false)}>Close</Button>
          <Button onClick={() => {
            handleCheckout();
          }}>Checkout</Button>
        </Modal.Footer>
      </Modal>


      <div className="acc_logo">
        <img
          src={acc}
          alt="sign in"
          className="login-icon"
          width="46px"
          onClick={toggleMenu}
        />
      </div>

      <div className={`drop ${isMenuVisible ? 'show' : ''}`}>
        <ul>
          {!isAuthenticated() && (
            <>
              <Link to="/login" className="log-opt">
                <li><img src={log_in} alt='login' />Login</li>
              </Link>
              <Link to="/register" className="log-opt">
                <li><img src={register} alt='register' />Register</li>
              </Link>
            </>
          )}
          <li><img src={acc_set} alt='account settings' />Settings</li>
          {isAuthenticated() && (
            <li onClick={handleLogout}>
              <img src={logout} alt='logout' />
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
