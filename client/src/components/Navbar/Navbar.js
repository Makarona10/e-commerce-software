import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import cart from '../../imgs/cart.png';
import { NavLink } from 'react-router-dom';

export const Nav_bar = (props) => {
  const [cartList, setCartList] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    setCartList([
      { name: 'GTX 3060', quantity: 4 },
      { name: 'i5-12400', quantity: 2 },
    ]);
  }, []);

  return (
    <nav className="navbar">
      <div className={`navbar-links ${isMenuVisible ? 'show' : 'hide'}`}>
        {[{'Home':'/'}, {'Orders history':'/new-product'}, {'Best sellers':'/v'}, {'Store products':'/list-merchant-products'}].map(
          (link, index) => (
            <NavLink exact to={Object.values(link)[0]}
              key={index}
              className="navbar-link"
            >
              {Object.keys(link)[0]}
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
          {cartList.length === 0 ? (
            <p>Cart is empty!</p>
          ) : (
            <div>
              <ul className="cart-items">
                {cartList.map((item, index) => (
                  <li key={index} className="cart-item">
                    {item.name} - {item.quantity} items
                  </li>
                ))}
              </ul>
              <div className="btn-container">
                <button className="checkout">checkout</button>
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
