import React, { useRef, useState } from "react";
import './addProduct.css';
import { Nav_bar } from '../Navbar/Navbar.js'
import { BrandBar } from "../brandBar/brandBar.js"
import axios from "axios";

export const AddProduct = () => {
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const fileInputRef = useRef(null);
    const [productDetails, setProductDetails] = useState({
        product_name: '',
        price: '',
        quantity: '',
        description: ''
    });
    const [theImage, setTheImage] = useState(null);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsFileUploaded(true);
            setTheImage(file); // Update the state
        } else {
            setIsFileUploaded(false);
        }
    };

    const setName = (e) => {
        setProductDetails(prevDetails => ({
            ...prevDetails,
            product_name: e.target.value
        }));
    }
    const setPrice = (e) => {
        setProductDetails(prevDetails => ({
            ...prevDetails,
            price: e.target.value
        }));
    }
    const setQuantity = (e) => {
        setProductDetails(prevDetails => ({
            ...prevDetails,
            quantity: e.target.value
        }));
    }
    const setDescription = (e) => {
        setProductDetails(prevDetails => ({
            ...prevDetails,
            description: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!theImage) {
            console.log("Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append('photo', theImage);
        formData.append('product_name', productDetails.product_name);
        formData.append('price', productDetails.price);
        formData.append('quantity', productDetails.quantity);
        formData.append('description', productDetails.description);
        try {
            console.log(formData);
            console.log(formData.get('quantity'));
            const response = await axios.post('http://localhost:3001/api/merchant', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(`Product added successfully: ${response.data.product_name}`);
        } catch (error) {
            console.log(`Error adding product: ${error}`);
        }
    }

    return (
        <div className="add-prod-page">
            <BrandBar />
            <Nav_bar search={false} />
            <div className="formContainer">
                <form className="addForm" onSubmit={handleSubmit}>
                    <div className="upper">
                        <div>
                            <label htmlFor="productName">Product name:</label>
                            <input type="text" name="productName" id="productName" onChange={setName}/>
                        </div>
                        <div>
                            <label htmlFor="price">Price:</label>
                            <input type="text" name="price" id="price" onChange={setPrice}/>
                        </div>
                    </div>
                    <div className="middle">
                        <div>
                            <label htmlFor="description">Describe your product:</label>
                            <textarea name="description" id="description" placeholder="Type the description here" onChange={setDescription}></textarea>
                        </div>
                    </div>
                    <div className="lower">
                        <div>
                            <label htmlFor="quantity">Quantity:</label>
                            <input className="quaninput" name="quantity" id="quantity" onChange={setQuantity}/>
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
