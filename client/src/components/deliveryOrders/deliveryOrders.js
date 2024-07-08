import React, { useEffect, useState } from "react";
import { Nav_bar } from "../Navbar/Navbar";
import { BrandBar } from "../brandBar/brandBar";
import './deliveryOrders.css';
import { api } from '../../api/axios';
import x from "../../imgs/x_icon.png"


export const DeliveryOrders = () => {
    const [orders, setOrders] = useState([]);
    const [content, setContent] = useState([]);


    const status = {
        accepted: 'Tap to advance to preparing status',
        preparing: 'Tap to start delivering the order',
        delivering: 'Tap if the order delivered',
        delivered: 'Order is delivered'
    }

    useEffect(() => {
        api.get('delivery/accepted')
            .then(res => {
                setOrders(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    const changeStat = (id, stat) => {
        const sts = ['accepted', 'preparing', 'delivering'];
        if (!sts.includes(stat)) return;

        for (let x = 0; x < sts.length; x++) {
            if (sts[x] === stat) {
                stat = Object.keys(status)[x + 1];
                break;
            }
        };
        api.patch(`delivery/${id}`, { status: stat })
            .then(res => console.log(res))
            .then(window.location.reload())
            .catch(err => console.log(err));
    };

    const emptyContent = () => {
        setContent([]);
    }


    return (
        <div className="delivery-orders1">
            <BrandBar />
            <Nav_bar />
            <div className="pending-container">
                {
                    content.length === 0 ? '' : (
                        <div className='content-ord'>
                            {
                                <div>
                                    <div className="pendix-btn"><img src={x} alt="x-icon" onClick={emptyContent} /></div>
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
                {orders.length === 0 ? (
                    <div className="not-assigned">You are not assigned to any orders yet</div>
                ) :
                    orders.map((item, idx) => {
                        return (
                            <div className="pending-card1" key={idx}>
                                <div className="detail-div">
                                    <div>Order id: {item.order_id}</div>
                                    <div>Client: {item.first_name} {item.last_name}</div>
                                    <div>Address: {item.address}</div>
                                    <div>Amount: ${item.amount}</div>
                                </div>
                                <div className="pend-stat">
                                    <div>
                                        <button onClick={() => changeStat(item.order_id, item.status)}>
                                            {(item.status)} <p>{item.status === 'delivered' ? '' : '>>'}</p>
                                        </button>
                                        <div>{status[item.status]}</div>
                                    </div>
                                    <div><button onClick={() => setContent(item.content)}>View content</button></div>
                                </div>
                            </div>)
                    })}
            </div>
        </div>
    )
}