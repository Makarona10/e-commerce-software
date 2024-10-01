import React, { useState } from 'react';
import './search.css'
import { api } from '../../../api/axios';
import { useNavigate } from 'react-router';


export const SearchBar = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()


    const handleChange = async (e) => {
        setName(e.target.value);
    };

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            return navigate(`/view-prods?search=${name}`);
        }
    }

    return (
        <div className="search-bar">
            <div className='srch-div'>
                <input
                    type="text"
                    className="srch-bar"
                    placeholder="Looking for something? ..."
                    onChange={(e) => { handleChange(e) }}
                    onKeyDown={handleKeyDown}
                // value={query}
                />
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#e8eaed">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                </svg>
                </div>
            </div>
        </div>
    );
};
