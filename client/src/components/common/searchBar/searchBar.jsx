import React, { useState } from 'react';
import './search.css'


export const SearchBar = () => {

    return (
        <div className="search-bar">
            <div className='srch-div'>
                <input
                    type="text"
                    className="srch-bar"
                    placeholder="Looking for something? ..."
                // onChange={search}
                // value={query}
                />
                <div>
                    <img src='https://img.icons8.com/?size=100&id=83218&format=png&color=000000' />
                </div>
            </div>
        </div>
    );
};
