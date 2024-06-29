import React, { component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import login from './login.png';

export const Nav_bar = () => {
    const [hoveredLink, setHoveredLink] = React.useState(null);

    const handleMouseEnter = (link) => {
        setHoveredLink(link);
    };

    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">MyBrand</div>
            <div className="navbar-links">
                {['Home', 'Orders history', 'Best sellers'].map((link, index) => (
                    <a
                        key={index}
                        href={`#${link.toLowerCase()}`}
                        className={`navbar-link ${hoveredLink === link ? 'hovered' : ''}`}
                        onMouseEnter={() => handleMouseEnter(link)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {link}
                    </a>
                ))}
            </div>
            <div id='logIco'>
                <a href="" className='contact'>Contact us</a>
                <img src={login}
                    alt='sign in' className="navbar-icon" width="44px" />
            </div>
        </nav>
    );
};

export default Nav_bar;