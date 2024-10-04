import 'bootstrap/dist/css/bootstrap.min.css';
import './brandBar.css';

export const BrandBar = () => {


  return (
    <nav className="logbar">
      <div id="logIco" className='text-zinc-100 flex items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960"
          width="30px" fill="#e8eaed" className='mr-3'>
          <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
        </svg>
        <div className=''>+20 115 287 7919</div>
      </div>
      <div className="mail_us text-zinc-100" title="send us an email">
        <svg xmlns="http://www.w3.org/2000/svg" height="34px" width="34px" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
        <div className='flex justify-center items-center relative left-1'>send us an email</div>
      </div>
    </nav>
  );
};
