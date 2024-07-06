import React, { useEffect, useState } from "react";
import './container.css';
import { api } from '../../api/axios';


export const ListProd = () => {

    const [productsData, setProductsData] = useState([]);


    useEffect(() => {
        api.get('products')
            .then(res => {
                setProductsData(res.data);
            });
    }, [])

    useEffect(() => {
        localStorage.setItem('cartList', []);
    }, [])

    const addToCart = (obj) => {
        let cart = localStorage.getItem('cartList');
        cart = cart ? JSON.parse(cart) : [];

        let flag = false;

        cart.forEach(item => {
            if (item.product_id === obj.product_id) {
                item.quantity += 1;
                flag = true;
                return;
            }
        })
        if (flag) {
            localStorage.setItem('cartList', JSON.stringify(cart));
        }
        obj.quantity = 1;
        cart.push(obj);
        localStorage.setItem('cartList', JSON.stringify(cart));
    }

    return (
        <div className="container">
            {productsData.map((item) => {
                return (
                    <div className="product" key={item.product_id}>
                        <div>
                            <img src={`http://localhost:3001/uploads/${item.image}`} alt="photo" />
                        </div>
                        <div className="det">
                            <div>
                                <h6>{item.product_name}</h6>
                            </div>
                            <div className="description">
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <p>peaces left: {item.quantity}</p>
                            </div>
                        </div>
                        <div className='carting'>
                            <p>{item.price}$</p>
                            <p onClick={() => addToCart({ product_id: item.product_id, price: item.price, product_name: item.product_name })}>+</p>
                            <p>-</p>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}