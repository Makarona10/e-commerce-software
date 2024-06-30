import React, { useState } from "react";
import './categories.css';


export const Categoside = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="sideContainer">
            <button className="categ-toggle" onClick={toggleMenu}>
                Categories
            </button>
            <div className={`sideBar ${isCollapsed ? 'collapsed' : ''}`}>
                {/* <h3>Categories</h3> */}
                <div className={`categs`} >
                    <div className="categ"><p>Electronics</p></div>
                    <div className="categ"><p>Computers</p></div>
                    <div className="categ"><p>Shoes</p></div>
                    <div className="categ"><p>Furniture</p></div>
                    <div className="categ"><p>Sports</p></div>
                    <div className="categ"><p>Games</p></div>
                </div>
            </div>
        </div >
    );
}