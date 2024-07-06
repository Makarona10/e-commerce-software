import React, { useEffect, useState } from "react";
import { BrandBar } from "../brandBar/brandBar.js";
import { Nav_bar } from "../Navbar/Navbar.js";
import './list_merchant.css';
import { api } from "../../api/axios.js";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";


export const ListMerchant = () => {
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState('');

    useEffect(() => {
        api.get('merchant')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        setStore(jwtDecode(localStorage.getItem('access_token')));
        console.log(store.name)
    }, [])

    return (
        <div className="lm-page">
            <BrandBar />
            <Nav_bar />
            <div className="merchant-container">
                <div className="up-merr">
                    <div className="sprod-list">{store.name} store Products</div>
                    <div className="addProdBtn">
                        <button><Link to='/new-product' target="blank">Publish product</Link></button>
                    </div>
                </div>
                <div>
                    {products.map((item) => {
                        return (
                            <div className="merchant-card" key={item.product_id}>
                                <div className="merchant-photo">
                                    <img src={`http://localhost:3001/uploads/${item.image}`} alt="photo" />
                                    {console.log(item.image)}
                                </div>
                                <div className="det-div">
                                    <div className="det-merchant">
                                        <div className="name-merchant">
                                            <p>{item.product_name}</p>
                                        </div>
                                        <div className="price-merchant">
                                            <p>{item.price}$</p>
                                        </div>
                                        <div className="quantity-merchant">
                                            <p>{item.quantity} Peaces</p>
                                        </div>
                                    </div>
                                    <div className="desc-div">
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className="merchant-btns">
                                    <div>
                                        <button className="rem-mod">REMOVE</button>
                                        <button className="rem-mod">MODIFY</button>
                                        <button className="rem-mod">PREVIEW</button>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}