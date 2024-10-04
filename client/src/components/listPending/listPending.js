import React, { useEffect, useState } from "react";
import './listPending.css';
import { NavBar } from "../Navbar/Navbar";
import { BrandBar } from "../brandBar/brandBar";
import { api } from "../../api/axios";
import x from "../../imgs/x_icon.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ListPending = () => {
    const [orders, setOrders] = useState([]);
    const [content, setContent] = useState([]);
    const [acceptModal, setAcceptModal] = useState(false);
    const [orderToAccept, setOrderToAccept] = useState(null);

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

    const get_items = (id) => {
        api.get(`customer/${id}`)
            .then(res => setContent(res.data.data))
            .catch(err => console.log(err));
    }

    const emptyContent = () => {
        setContent([]);
    }

    return (
        <div className="listPendPage">
            <BrandBar />
            <NavBar />
            <Modal
                show={acceptModal}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header
                    className='text-center flex justify-center'>
                    <Modal.Title id="contained-modal-title-vcenter" className=''>
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className='flex justify-center items-center w-full p-4'>
                    <p className="text-xl font-normal">Are you sure you are up to this ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setAcceptModal(false)}
                        className='bg-violet-800 border-none hover:bg-red-800'
                    >Close</Button>
                    <Button onClick={() => { acceptOrder(orderToAccept); }}
                        className='bg-violet-800 border-none'
                    >Confirm</Button>
                </Modal.Footer>
            </Modal>
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
                                <div><button onClick={() => {
                                    setAcceptModal(true);
                                    setOrderToAccept(item.id);
                                }}>Accept order</button></div>
                                <div><button onClick={() => get_items(item.id)}>View content</button></div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
} 