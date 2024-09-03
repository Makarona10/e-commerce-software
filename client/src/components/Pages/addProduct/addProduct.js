import React, { useState, useRef } from 'react';
import { BrandBar } from '../../brandBar/brandBar';
import { Nav_bar } from '../../Navbar/Navbar';
import { api } from '../../../api/axios';
import './addProduct.css'

export const AddProduct = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const fileInputRef = useRef(null);
  const [productDetails, setProductDetails] = useState({});
  const [err, setErr] = useState(null);
  const [theImage, setTheImage] = useState(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setIsFileUploaded(true);
      setTheImage(file);
    } else {
      setIsFileUploaded(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product_name', productDetails.product_name);
    formData.append('price', productDetails.price);
    formData.append('quantity', productDetails.quantity);
    formData.append('description', productDetails.description);

    if (theImage) {
      formData.append('photo', theImage);
    }
    console.log(`\n\n\n\n\n\nFormData: ${formData}\n\n\n\n\n\n\n\n\n`);

    try {
      const response = await api.post('merchant', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setErr(null);
      console.log(`Product added successfully: ${response.data.msg}`);
      window.location.href = 'http://localhost:3000/list-merchant-products';
    } catch (err) {
      console.log(theImage)
      setErr(err.response.data.msg);
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="add-prod-page">
      <BrandBar />
      <Nav_bar search={false} />
      <div className="formContainer">
        <form className="addForm" onSubmit={handleSubmit}>
          <div className="upper">
            <div>
              <label htmlFor="product_name">Product name:</label>
              <input
                type="text"
                name="product_name"
                id="product_name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input type="number" name="price" id="price" onChange={handleChange} />
            </div>
          </div>
          <div className="middle">
            <div>
              <label htmlFor="description">Describe your product:</label>
              <textarea
                name="description"
                id="description"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="lower">
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                className="quaninput"
                name="quantity"
                id="quantity"
                onChange={handleChange}
                type='number'
              />
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
                name="photo"
                id="upload-image"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="add-err-div">{err ? err : null}</div>
          <div>
            <button type="submit">Publish product</button>
          </div>
        </form>
      </div>
    </div>
  );
};
