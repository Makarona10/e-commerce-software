import 'bootstrap/dist/css/bootstrap.min.css';
import './brandBar.css';
import mail from '../../imgs/mail_us.png';
import contactIcon from '../../imgs/call_us.png';

export const BrandBar = () => {


  return (
    <nav className="logbar">
      <div className="nav-links"></div>
      <div id="logIco">
        <img src={contactIcon} alt="contact-us" className="call" />
        <div style={{ 'margin-left': '10px' }}>+20 115 287 7919</div>
      </div>
      <div className="mail_us" title="send us an email">
        <img src={mail} alt="contact-us" className="contact" />
        <span>send us an email</span>
      </div>
    </nav>
  );
};
