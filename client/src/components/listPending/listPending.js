import React, { useEffect, useState } from "react";
import './listPending.css';
import { NavBar } from "../Navbar/Navbar";
import { BrandBar } from "../brandBar/brandBar";
import { api } from "../../api/axios";
import x from "../../imgs/x_icon.png";


export const ListPending = () => {
    const [orders, setOrders] = useState([]);
    const [content, setContent] = useState([]);

    useEffect(() => {
        api.get('delivery')
            .then(res => setOrders(res.data.data))
            .catch(err => console.log(err));
    }, [])


    const acceptOrder = (id) => {
        api.post(`delivery/${id}`)
        .then(res => window.location.reload())
        .catch(err => console.log(err));
    }

    const emptyContent = () => {
        setContent([]);
    }

    return (
        <div className="listPendPage">
            <BrandBar />
            <NavBar />
            <div className="pending-container">
                {
                    content.length === 0 ? '' : (
                        <div className='content-ord'>
                            {
                                <div>
                                    <div className="pendix-btn"><img src={x} alt="x-icon" onClick={emptyContent}/></div>
                                    {
                                        content.map(item => {
                                            return (
                                                <div className='del-ord-cont'>
                                                    <div>Product: {item.product_name}</div>
                                                    <div>Quantity: {item.quantity} {item.quantity === 1 ? 'item' : 'items'}</div>
                                                    <div>Unit price: ${item.price}</div>
                                                    <div>Total price: ${item.price * item.quantity}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    )}
                {orders.map(item => {
                    return (
                        <div className="pending-card1" key={item.order_id}>
                            <div className="detail-div">
                                <div>Order id: {item.id}</div>
                                <div>Client: {item.first_name} {item.last_name}</div>
                                <div>Address: {item.address}</div>
                                <div>Amount: ${item.amount}</div>
                            </div>
                            <div className="pend-stat">
                                <div><button onClick={() => acceptOrder(item.id)}>Accept order</button></div>
                                <div><button onClick={() => setContent(item.content)}>View content</button></div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
} 