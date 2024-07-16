import React, { useState } from 'react';
import './categories.css';


// A component to display categories
export const Categoside = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // a function to toggle the categories menu
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="sideContainer">
      <button className="categ-toggle" onClick={toggleMenu}>
        Categories
      </button>
      <div className={`sideBar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className={`categs`}>
          <div className="categ">
            <p>Electronics</p>
          </div>
          <div className="categ">
            <p>Computers</p>
          </div>
          <div className="categ">
            <p>Shoes</p>
          </div>
          <div className="categ">
            <p>Furniture</p>
          </div>
          <div className="categ">
            <p>Sports</p>
          </div>
          <div className="categ">
            <p>Games</p>
          </div>
        </div>
      </div>
    </div>
  );
};
