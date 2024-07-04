import React, { useEffect, useState } from "react";
import { Nav_bar } from "../Navbar/Navbar";
import { BrandBar } from "../brandBar/brandBar";
import './deliveryOrders.css';
import { api } from '../../api/axios';


export const DeliveryOrders = () => {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        api.get('http://localhost:3001/api/delivery/accepted')
            .then(res => {
                setOrders(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <div className="delivery-orders1">
            <BrandBar />
            <Nav_bar />
            <div className="pending-container">
                <div className="pending-card1">
                    <div className="detail-div">
                        <div>Order id: 75168</div>
                        <div>Client: Achraf Bencharki</div>
                        <div>Address: Meet okba - right in my heart beside Ahmed sayed zizo and Ibrahima ndaye</div>
                    </div>
                    <div className="pend-stat">
                        <div><button>Status</button></div>
                        <div><button>View content</button></div>
                    </div>
                </div>
                {orders.length === 0 ? (
                    <div className="not-assigned">You are not assigned to any orders yet</div>
                ) :
                    orders.map((item, idx) => {
                        return (
                            <div className="pending-card1" key={idx}>
                                <div className="detail-div">
                                    <div>{item.order_id}</div>
                                    <div>Client: {item.first_name} {item.last_name}</div>
                                    <div>Address: {item.address}</div>
                                </div>
                                <div className="pend-stat">
                                    <div><button>{item.status}</button></div>
                                    <div><button>View content</button></div>
                                </div>
                            </div>)
                    })}
            </div>
        </div>
    )
}