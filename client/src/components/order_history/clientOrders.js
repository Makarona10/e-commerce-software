import React, { useEffect, useState } from "react";
import { NavBar } from "../Navbar/Navbar";
import './clientOrders.css';
import { BrandBar } from "../brandBar/brandBar";
import { MyFooter } from "../common/footer/footer";
import { api } from "../../api/axios";
import ReactStars from 'react-rating-stars-component';


export const ClientOrders = () => {
    const [prevVisible, setPrevVisible] = useState(false)
    const [items, setItems] = useState([]);
    const [id, setId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [toggleCancel, setToggleCancel] = useState(false);
    const [toggleReview, setToggleReview] = useState(false);
    const [review, setReview] = useState({});
    const [ratingValue, setRatingValue] = useState(1);
    const [reviewError, setReviewError] = useState(null);
    const [isDelivered, setIsDelivered] = useState(false);

    const handleStars = (e) => {
        setRatingValue(e);
    }

    const postReview = () => {

        api.post(`customer/${review.id}`, {
            comment: review.comment,
            rating: ratingValue
        }).then(res => {

            if (res.data.statusCode === 201) {
                setReviewError(res.data.msg);
                window.location.reload();
            }
        }).catch(err => {
            if (err.response.data.statusCode === 400) {
                setReviewError(err.response.data.message);
            };
        })
    }


    useEffect(() => {
        api.get('/customer')
            .then(res => setOrders(res.data))
            .catch(error => console.log(error));
    }, []);


    const getOrderItems = (id) => {
        api.get(`customer/${id}`)
            .then(res => { setItems(res.data.data) })
            .catch(error => console.log(error));
        setPrevVisible(true);
    };


    const cancelOrder = (id) => {
        api.delete(`customer/${id}`)
            .then(res => window.location.reload())
            .catch(error => console.log(error));
    }



    return (
        <div className="orders-history">
            <BrandBar />
            <NavBar />


            <div className={`rev-win ${toggleReview ? 'show' : ''}`}>
                <button
                    className="text-lg w-6 h-6 absolute right-5 top-5 bg-red-700 rounded
                    p-0 border-0 flex items-center justify-center text-white font-bold"
                    onClick={() => {
                        setReviewError(null);
                        setRatingValue(1);
                        setReview({ id: null, comment: null });
                        setToggleReview(false);
                    }}
                >x</button>
                <h1 className="text-lg mb-4 font-bold">{review.name}</h1>
                <h4 className="mb-3">*You can only rate the product once</h4>
                <ReactStars classNames='starsRating'
                    count={5}
                    size={30}
                    edit={true}
                    value={ratingValue}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    onChange={handleStars}
                />
                <textarea
                    placeholder="Leave a comment for your review ..."
                    className="w-full h-56 resize-none mt-10"
                    value={review.comment}
                    onChange={(e) => { setReview({ ...review, comment: e.target.value }); console.log(ratingValue) }}
                ></textarea>
                <p className="mt-6 text-md text-red-500">{reviewError}</p>
                <button
                    className="mt-6 bg-cyan-800 border-none text-white text-lg"
                    onClick={() => postReview(items)}
                >Review</button>
            </div>



            <div className={`prev-window h-48 overflow-y-hidden	${toggleCancel ? 'show' : ''} `}>
                <h1 className="text-2xl mt-4">Are You sure you want to cancel this order ?</h1>
                <h6 className="text-sm mt-4">*Notice: It can't be activated again</h6>
                <div className="flex justify-center mt-10">
                    <button className="rounded-md border-0 bg-red-700 text-white text-xl mr-4"
                        onClick={() => cancelOrder(id)}>
                        Yes</button>
                    <button className="rounded-md border-0 bg-blue-600 text-white text-xl"
                        onClick={() => setToggleCancel(false)}>No</button>
                </div>
            </div>




            <div className={`prev-window ${prevVisible ? 'show' : ''}`}>
                <button
                    className="text-lg w-6 h-6 absolute right-5 top-5 bg-red-700 rounded
                    p-0 border-0 flex items-center justify-center text-white font-bold"
                    onClick={() => setPrevVisible(false)}
                >x</button>
                <div>
                    <h1 className="text-center text-2xl mt-11 pb-4 underline">Your order items</h1>
                    {items.map(item => {
                        return (
                            <div
                                className="pt-4 w-10/12 m-auto flex items-center border-solid border-black border-b-2"
                                key={item.id}
                            >
                                <div className="flex items-center w-20 h-18">
                                    <img className="max-w-20 max-h-18" src={`http://localhost:3001/uploads/${item.image}`} alt='product pic' />
                                </div>
                                <div className="flex flex-col ml-10 w-100 ">
                                    <div className="flex text-md font-medium max-w-80 text-wrap text-left">{item.product_name}</div>
                                    <div className="flex pb-3">
                                        <h3 className="mt-2">unit price: {item.offer ? item.offer : item.price}$</h3>
                                        <h3 className="mt-2 ml-10">quantity: {item.quantity}</h3>
                                    </div>
                                </div>
                                <button
                                    className={`text-white h-9 relative
                                        left-8 bg-sky-900 hover:bg-sky-700 border-none
                                        ${isDelivered ? '' : 'hidden'}`}
                                    onClick={() => {
                                        setReview({ name: item.product_name, id: item.id });
                                        setToggleReview(true);
                                    }}
                                >
                                    review
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>




            <div className="history-container">
                {orders.map(order => {
                    const date = new Date(order.date_created);
                    const d = date.toLocaleString();
                    return (
                        <div className="order-card">
                            <div className="order-det">
                                <div><p>Order id: {order.id}</p></div>
                                <div>Address: {order.address}</div>
                                <div><p>amount: {order.amount}$</p></div>
                                <div><p>Order date: {d.toLocaleString()}</p></div>
                            </div>
                            <div className="r-card">
                                <div>
                                    <div className={`ord-stat flex justify-center items-center`}>
                                        <p className={`order-status
                                            ${order.status === 'delivered' || order.canceled === 1
                                                ? 'animate-none bg-fuchsia-900' : ''}`}
                                        >{order.canceled === 0 ? order.status.toUpperCase() :
                                            'CANCELED'}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="cancel-btn flex justify-center mt-2">
                                        <button
                                            className={`flex justify-center ${order.status === 'delivered' || order.canceled === 1 ?
                                                    'hidden' : ''} `}
                                            onClick={() => {
                                                setToggleCancel(true);
                                                setId(order.id);
                                            }}
                                        >CANCEL</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="preview-btn flex m-auto justify-center mt-2">
                                        <button className="flex justify-center"
                                            onClick={() => {
                                                getOrderItems(order.id);
                                                order.status === 'delivered' ? setIsDelivered(true) : setIsDelivered(false)
                                            }}>
                                            PREVIEW</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>



            <MyFooter />
        </div>
    )
}