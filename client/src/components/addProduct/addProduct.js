import React, { useRef, useState } from 'react';
import './addProduct.css';
import { Nav_bar } from '../Navbar/Navbar.js';
import { BrandBar } from '../brandBar/brandBar.js';

export const AddProduct = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsFileUploaded(true);
    } else {
      setIsFileUploaded(false);
    }
  };

  return (
    <div className="add-prod-page">
      <BrandBar />
      <Nav_bar search={false} />
      <div className="formContainer">
        <form className="addForm">
          <div className="upper">
            <div>
              <label htmlFor="productName">Product name:</label>
              <input type="text" name="productName" id="productName" />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input type="text" name="price" id="price" />
            </div>
          </div>
          <div className="middle">
            <div>
              <label htmlFor="description">Describe your product:</label>
              <textarea name="description" id="description"></textarea>
            </div>
          </div>
          <div className="lower">
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input className="quaninput" name="quantity" id="quantity" />
            </div>
            <div className="file-input-wrapper">
              {isFileUploaded ? (
                <p>Uploaded!</p>
              ) : (
                <p>Upload the product photo</p>
              )}
              <button
                type="button"
                className="file-input-button"
                onClick={handleFileButtonClick}
              >
                Choose photo
              </button>
              <input
                type="file"
                name="upload-image"
                id="upload-image"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div>
            <button type="submit">Publish product</button>
          </div>
        </form>
      </div>
    </div>
  );
};
