import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import cart from '../../imgs/cart.png';

export const Nav_bar = () => {

    const [cartList, setCartList] = useState([]);
    const [cartVisible, setCartVisible] = useState('cart-list')

    const toggleCart = () => {
        if (cartVisible === 'hidden')
            setCartVisible('cart-list');
        else
            setCartVisible('hidden');
    }
    useEffect(() => {
        setCartList([
            { name: "GTX 3060", quantity: 4 },
            { name: "i5-12400", quantity: 2 }
        ]);
    }, []);


    return (
        <nav className="navbar">
            <div className="navbar-links">
                {['Home', 'Orders history', 'Best sellers', 'Stores'].map((link, index) => (
                    <a
                        key={index}
                        href={`#${link.toLowerCase()}`}
                        className='navbar-link'
                    >
                        {link}
                    </a>
                ))}
            </div>
            <input type="text" placeholder="Search for a product..." className="search-input" />
            <div className="cart-logo">
                <img src={cart} alt="cart" width="40px" onClick={toggleCart} />
                <div className={cartVisible}>
                    {cartList.length === 0 ? (
                        <p>Cart is empty!</p>
                    ) : (
                        <div>
                            <ul className="cart-items">
                                {cartList.map((item, index) => (
                                    <li key={index} className="cart-item">
                                        {item.name} : {item.quantity} items
                                    </li>
                                ))}
                            </ul>
                            <div className='btn-container'>
                                <button className='checkout'>checkout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav_bar;
