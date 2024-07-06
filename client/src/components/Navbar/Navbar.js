import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import cart from '../../imgs/cart.png';
import { NavLink, redirect } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../api/axios';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';


export const Nav_bar = (props) => {
  const [cartList, setCartList] = useState([
    {
      address: '',
      products: []
    }
  ]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [role, setRole] = useState(null);
  const [links, setLinks] = useState({
    'Home': '/',
    'Stores': '&',
    'Best sellers': '@'
  })
  const stripePromise = loadStripe('pk_test_51PWn2V2LcWJtaPbbBrpvPUeP2GHUvybeLln5FxrzbDIibAWW6q6SSjTQRLxpic9rrkuqnpQLPZzwerl5AMSa5j0I00EU1W1vj3');
  let theToken = localStorage.getItem('access_token');
  const navigate = useNavigate()

  useEffect(() => {
    if (theToken) {
      const decodedToken = jwtDecode(theToken);
      setRole(decodedToken.role);
    }
  }, [theToken]);

  useEffect(() => {
    if (role === 'merchant') {
      setLinks({
        'Store products': '/list-merchant-products',
        'Most sold': '/mostSold',
        'Best Clients': '/best',
        'Store info': '/facebook.com'
      })
    }
    else if (role === 'client') {
      setLinks({
        'Home': '/',
        'Trending': '/trend',
        'Offers': '/offers',
        'Orders': '/orders-history'
      })
    }
    else if (role === 'client') {
      setLinks({
        'Assigned orders': '/delivery-orders',
        'Pending': '/pending',
      })
    }
  }, [role])



  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    setCartList({
      address: 'Meet-okba',
      products:
        (localStorage.getItem('cartList')) ? JSON.parse(localStorage.getItem('cartList')) : []
    });
  }, [localStorage.getItem('cartList'), ]);

  const handleCheckout = async () => {
    const response = await api.post('customer', cartList);
    if (response.status === 200) {
      window.location.href = response.data.sessionUrl;
      console.log(response.data.sessionUrl);
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
      console.log('Checkout failed !', error);
    }
  }



  return (
    <nav className="navbar">
      <div className={`navbar-links ${isMenuVisible ? 'show' : 'hide'}`}>
        {Object.keys(links).map(
          (link, idx) => (
            <NavLink exact to={Object.values(links)[idx]}
              key={idx}
              className="navbar-link"
            >
              {link}
            </NavLink>
          ),
        )}
      </div>
      <input
        type="text"
        placeholder="Search for a product..."
        className={`search-input ${props.search ? '' : 'hide'}`}
      />
      <div className="cart-logo">
        <img src={cart} alt="cart" width="40px" onClick={toggleCart} />
        <div className={isCartVisible ? 'cart-list' : 'hidden'}>
          {!cartList.products ? (
            <p>Cart is empty!</p>
          ) : (
            <div>
              <ul className="cart-items">
                {cartList.products.map((item) => (
                  <li key={item.id} className="cart-item">
                    {item.product_name} - {item.quantity} items (${item.quantity*item.price})
                  </li>
                ))}
              </ul>
              <div className="btn-container">
                <button className="checkout" onClick={handleCheckout}>checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};
