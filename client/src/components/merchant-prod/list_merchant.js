import React, { useEffect, useState } from "react";
import { BrandBar } from "../brandBar/brandBar.js";
import { NavBar } from "../Navbar/Navbar.js";
import './list_merchant.css';
import { api } from "../../api/axios.js";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { MyFooter } from "../common/footer/footer.jsx"


export const ListMerchant = () => {
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState('');
    const [toggle, setToggle] = useState(false);
    const [deleteProd, setDeleteProd] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('merchant', { params: { page: 1 } })
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
        setStore(jwtDecode(localStorage.getItem('access_token')));
        console.log(store.name)
    }, [])

    const handleClick = (e) => {
        navigate('/modify-product', { state: { id: e.id, quantity: e.quantity, description: e.description, price: e.price } });
    }

    const handleRemove = (id) => {
        console.log(id)
        api.delete(`merchant/${id}`)
            .then(res => window.location.reload())
            .catch(err => console.log(err));
    }

    const handleToggle = (val) => {
        setToggle(val);
    }

    return (
        <div className="lm-page">
            <div className={`popup ${toggle ? '' : 'hide'}`}>
                <div className="overlay remove-prod">
                    <h1>Are you sure you want to delete this product ?</h1>
                    <div>
                        <button onClick={() => handleRemove(deleteProd)}>Delete</button>
                        <button
                        onClick={() => {
                            handleToggle(false);
                            setDeleteProd(null);
                        }}
                        >Cancel</button>
                    </div>
                </div>
            </div>
            <BrandBar />
            <NavBar />
            <div className="merchant-container">
                <div className="up-merr">
                    <div className="sprod-list">{store.name}YOUR STORE PRODUCTS</div>
                    <div className="addProdBtn">
                        <button><Link to='/new-product' target="blank">Publish product</Link></button>
                    </div>
                </div>
                <div>
                    {products.map((item) => {
                        return (
                            <div className="merchant-card" key={item.product_id}>
                                <div className="merchant-photo">
                                    <img src={`http://localhost:3001/uploads/${item.image}`} alt={item.name} />
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
                                        <button className="rem-mod"
                                        onClick={() => {
                                            setDeleteProd(item.id);
                                            setToggle(true);
                                        }}
                                        >REMOVE</button>
                                        <button className="rem-mod" onClick={() => handleClick({
                                            id: item.id,
                                            price: item.price, quantity: item.quantity, description: item.description,
                                            offer: item.offer
                                        })}>MODIFY</button>
                                        {/* <button className="rem-mod">PREVIEW</button> */}
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
            <MyFooter />
        </div>
    )
}