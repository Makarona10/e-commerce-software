import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './brandBar.css';
import loginIcon from './login.png';
import contactIcon from '../../imgs/contact.png';

export const BrandBar = () => {
    const [isVisible, setVisible] = React.useState('hidden');

    const showDropDown = () => {
        if (isVisible === 'drop')
            setVisible('hidden')
        else
            setVisible('drop')
    }
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
                <div className={isVisible} >
                    <ul>
                        <li>Login</li>
                        <li>Register</li>
                        <li>Settings</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
