import React, { useState, useRef, useEffect } from 'react';
import { BrandBar } from '../../brandBar/brandBar';
import { NavBar } from '../../Navbar/Navbar';
import { api } from '../../../api/axios';
import './addProduct.css';
import { MyFooter } from '../../common/footer/footer';

export const AddProduct = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [toggleCheck, setToggleCheck] = useState(false);
  const fileInputRef = useRef(null);
  const [productDetails, setProductDetails] = useState({});
  const [err, setErr] = useState(null);
  const [theImage, setTheImage] = useState(null);
  const [subCtgs, setsubCtgs] = useState([]);

  useEffect(() => {
    api.get('categories/subcategories')
      .then(res => {
        setCategories(res.data.data);
      }).catch();
  }, []);

  const handleToggleChecklst = () => {
    setToggleCheck(!toggleCheck);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsFileUploaded(true);
      setTheImage(file);
    } else {
      setIsFileUploaded(false);
    }
  };

  const handleCheckChange = (data) => {
    if (subCtgs.includes(data)) {
      setsubCtgs(subCtgs.filter((item) => item !== data));
    } else {
      setsubCtgs([...subCtgs, data]);
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
    formData.append('subcategory', subCtgs);
    if (theImage) {
      formData.append('photo', theImage);
    }

    try {
      console.log(formData.product_name);
      const response = await api.post('merchant', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Log the response', err)
      if (response?.response?.data?.statusCode === 400) {
        setErr(response?.response?.data.msg);
      };
      console.log(`Product added successfully: ${response.data.msg}`);
      window.location.href = 'http://localhost:3000/list-merchant-products';
    } catch (error) {
      try {
        setErr(error.response.data.error[0].msg);
      } catch (error2) {
        if (error?.response?.data?.statusCode === 400) {
          setErr(error.response.data.message);
        }
        else {
          setErr("Unknown Error happened!");
        }
      }
    }
  };

  return (
    <div className="add-prod-page">
      <BrandBar />
      <NavBar />
      <div >
        <div>

        </div>
      </div>
      <div className="formContainer">
        <form className="addForm" onSubmit={handleSubmit}>
          <div className="upper">
            <div>
              <label htmlFor="product_name">Product name:</label>
              <input
                type="text"
                name="product_name"
                id="product_name"
                required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input type="number" name="price" id="price" onChange={handleChange} />
            </div>
            <div>
              <div className="ctg-chk-lst" onClick={handleToggleChecklst}>
                <label htmlFor="categories">Categories</label>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z" /></svg>
              </div>
              <div name="categories">
                <ul className={toggleCheck ? 'ctg-chk' : 'ctg-chk hidden'}>
                  {categories.map((ctg) => (
                    <li key={ctg.id}>
                      <input
                        type="checkbox"
                        value={ctg.name}
                        onChange={() => handleCheckChange(ctg.id)}
                      />
                      <span>{ctg.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
      <MyFooter />
    </div>
  );
};
