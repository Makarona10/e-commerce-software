import React, { useState } from "react";
import { BrandBar } from "../brandBar/brandBar";
import { NavBar } from "../Navbar/Navbar";
import './modifyProduct.css';
import { useLocation } from "react-router";
import { api } from "../../api/axios";
import { MyFooter } from "../common/footer/footer";
import { useNavigate } from "react-router";


export const ModifyProduct = () => {
    const location = useLocation();
    const { id, quantity, description, price, offer } = location.state || {};
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [newPrice, setNewPrice] = useState(price);
    const [newDescription, setNewDescription] = useState(description);
    const [newOffer, setNewOffer] = useState(offer);
    const navigate = useNavigate();


    const handleChangeQuantity = (e) => {
        setNewQuantity(e.target.value);
    };
    const handleChangePrice = (e) => {
        setNewPrice(e.target.value);
    };
    const handleChangeDescription = (e) => {
        setNewDescription(e.target.value);
    };
    const handleChangeOffer = (e) => {
        setNewOffer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.patch(`merchant/${id}`, {
            new_price: newPrice,
            new_quantity: newQuantity,
            new_description: newDescription,
            new_offer: newOffer
        }).then(res => navigate(-1))
        .catch(err => console.error(err));

    }

    return (
        <div>
            <BrandBar />
            <NavBar />
            <div className="mod-form">
                <h1>Update product information</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex-row justify-center space-x-1.5">
                        <div>
                            <label htmlFor="price">New price:</label>
                            <input type="number" name="price" id="price" className="w-60 mr-2" defaultValue={price} onChange={handleChangePrice} />
                        </div>
                        <div>
                            <label htmlFor="quantity">New quantity:</label>
                            <input type="number" className="w-60" name="quantity" id="quantity" defaultValue={quantity} onChange={handleChangeQuantity} />
                        </div>
                        <div>
                            <label htmlFor="offer">Offer price:</label>
                            <input type="number" className="w-60" name="offer" id="offer" defaultValue={offer} onChange={handleChangeOffer} />
                        </div>
                    </div>
                    <div className="middle">
                        <div>
                            <label htmlFor="description">The new description of your product:</label>
                            <textarea name="description" id="descript" defaultValue={description} onChange={handleChangeDescription}></textarea>
                        </div>
                    </div>
                    <div className="lower">
                    </div>
                    <div>
                        <button type="submit">Confirm</button>
                    </div>
                </form>
            </div>
            <MyFooter />
        </div>
    )
}