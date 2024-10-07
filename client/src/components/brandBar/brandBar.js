import 'bootstrap/dist/css/bootstrap.min.css';
import './brandBar.css';

export const BrandBar = () => {


  return (
    <nav className="logbar">
      <div
        className='text-gray-200 font-400 text-lg absolute right-20 items-center
        opacity-65 hover:opacity-100 hover:cursor-pointer flex'
      >
        <span className="material-symbols-outlined">About us</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        </div>
      <div id="logIco" className='text-zinc-100 flex items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960"
          width="30px" fill="#e8eaed" className='mr-3'>
          <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
        </svg>
        <div className=''>+20 101 088 877</div>
      </div>
      <div className="mail_us text-zinc-100" title="send us an email">
        <svg xmlns="http://www.w3.org/2000/svg" height="34px" width="34px" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
        <div className='flex justify-center items-center relative left-2'>Send us an email</div>
      </div>
    </nav>
  );
};
