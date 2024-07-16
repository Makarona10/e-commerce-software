import React, { useEffect, useState } from "react";
import './listPending.css';
import { Nav_bar } from "../Navbar/Navbar";
import { BrandBar } from "../brandBar/brandBar";
import { api } from "../../api/axios";
import x from "../../imgs/x_icon.png";


// A component to display the current pending orders of clients
export const ListPending = () => {
    const [orders, setOrders] = useState([]);
    const [content, setContent] = useState([]);

    useEffect(() => {
        api.get('delivery')
            .then(res => setOrders(res.data))
            .catch(err => console.log(err));
    }, [])


    const acceptOrder = (id) => {
        api.post(`delivery/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    const emptyContent = () => {
        setContent([]);
    }

    return (
        <div className="listPendPage">
            <BrandBar />
            <Nav_bar />
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
                                <div>Order id: {item.order_id}</div>
                                <div>Client: {item.first_name} {item.last_name}</div>
                                <div>Address: {item.address}</div>
                                <div>Amount: ${item.amount}</div>
                            </div>
                            <div className="pend-stat">
                                <div><button onClick={() => acceptOrder(item.order_id)}>Accept order</button></div>
                                <div><button onClick={() => setContent(item.content)}>View content</button></div>
                            </div>
                        </div>
                    )
                })}
                <div className="pending-card1">
                    <div className="detail-div">
                        <div>Order id: 75168</div>
                        <div>Client: Achraf Bencharki</div>
                        <div>Address: Meet okba - right in my heart beside Ahmed sayed zizo and Ibrahima ndaye</div>
                    </div>
                    <div className="pend-stat">
                        <div><button>Accept order</button></div>
                        <div><button>View content</button></div>
                    </div>
                </div>
                <div className="pending-card1">
                    <div className="detail-div">
                        <div>Order id: 75168</div>
                        <div>Client: Achraf Bencharki</div>
                        <div>Address: Meet okba - right in my heart beside Ahmed sayed zizo and Ibrahima ndaye</div>
                    </div>
                    <div className="pend-stat">
                        <div><button>Accept order</button></div>
                        <div><button>View content</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
} 