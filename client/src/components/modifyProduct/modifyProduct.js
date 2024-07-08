import React, { useEffect, useState } from "react";
import { BrandBar } from "../brandBar/brandBar";
import { Nav_bar } from "../Navbar/Navbar";
import './modifyProduct.css';
import { useLocation } from "react-router";
import { api } from "../../api/axios";

export const ModifyProduct = () => {
    const location = useLocation();
    const { id, quantity, description, price } = location.state || {};
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [newPrice, setNewPrice] = useState(price);
    const [newDescription, setNewDescription] = useState(description);

    const handleChangeQuantity = (e) => {
        setNewQuantity(e.target.value);
    };
    const handleChangePrice = (e) => {
        setNewPrice(e.target.value);
    };
    const handleChangeDescription = (e) => {
        setNewDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await api.patch(`merchant/${id}`, { new_price: newPrice, new_quantity: newQuantity, new_description: newDescription });
            console.log(resp.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <BrandBar />
            <Nav_bar search={false} />
            <div className="mod-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor="price">New price:</label>
                            <input type="number" name="price" id="price" defaultValue={price} onChange={handleChangePrice} />
                        </div>
                        <div>
                            <label htmlFor="quantity">New quantity:</label>
                            <input type="number" className="quaninput" name="quantity" id="quantity" defaultValue={quantity} onChange={handleChangeQuantity} />
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
        </div>
    )
}