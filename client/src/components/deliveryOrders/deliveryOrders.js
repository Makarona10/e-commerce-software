import React, { useEffect, useState } from "react";
import { NavBar } from "../Navbar/Navbar";
import { BrandBar } from "../brandBar/brandBar";
import './deliveryOrders.css';
import { api } from '../../api/axios';
import x from "../../imgs/x_icon.png"
import { MyFooter } from '../common/footer/footer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


// A component to display the current assigned order to a delivery boy
export const DeliveryOrders = () => {
    const [orders, setOrders] = useState([]);
    const [content, setContent] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statModal, setStatModal] = useState(false);


    const status = {
        accepted: 'Tap to advance to preparing stage',
        preparing: 'Tap to start delivering the order',
        delivering: 'Tap if you already delivered the order',
        delivered: ''
    }

    useEffect(() => {
        api.get('delivery/accepted')
            .then(res => {
                setOrders(res.data.data);
            }).catch(err => {
                console.error(err);
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
            .then(window.location.reload())
            .catch(err => console.error(err));
    };

    const emptyContent = () => {
        setContent([]);
    }

    const get_items = (id) => {
        api.get(`customer/${id}`)
            .then(res => setContent(res.data.data))
            .catch(err => console.error(err));
    }

    return (
        <div className="delivery-orders1">
            <BrandBar />
            <NavBar />
            <Modal
                show={statModal}
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
                    <p className="text-xl font-normal">Are you ready to move on to next stage ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setStatModal(false)}
                        className='bg-violet-800 border-none hover:bg-red-800'
                    >Cancel</Button>
                    <Button onClick={() => { changeStat(selectedOrder.id, selectedOrder.status); }}
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
                                                    <div>Unit price: ${item.offer ? item.offer : item.price}</div>
                                                    <div>Total price:
                                                        ${(item.offer ? item.offer : item.price) * item.quantity}</div>
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
                                    <div>Order id: {item.id}</div>
                                    <div>Client: {item.first_name} {item.last_name}</div>
                                    <div>Address: {item.address}</div>
                                    <div>Amount: ${item.amount}</div>
                                </div>
                                <div className="pend-stat flex items-center">
                                    {item.canceled === 0 ?
                                        <div>
                                            <button onClick={() => {
                                                if (item.status !== 'delivered') {
                                                    setSelectedOrder({ id: item.id, status: item.status });
                                                    setStatModal(true);
                                                }
                                            }}>
                                                {(item.status)} <p>{item.status === 'delivered' ? '' : '>>'}</p>
                                            </button>
                                            <div className="text-gray-300 relative top-3">{status[item.status]}</div>
                                        </div> :
                                        <div className="text-slate-100 flex items-center text-center">Order is canceled</div>
                                    }
                                    <div><button onClick={() => { get_items(item.id) }}>View content</button></div>
                                </div>
                            </div>)
                    })}
            </div>
            <MyFooter />
        </div>
    )
}