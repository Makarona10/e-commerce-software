import React, { useEffect, useState } from "react";
import './productCard.css';
import viewDetailsImg from '../../../imgs/viewDetails.png';
import ReactStars from 'react-rating-stars-component';
import 'react-slideshow-image/dist/styles.css';

export const ProdCard = ({ head, data }) => {
    const [hoveredProducts, setHoveredProducts] = useState(false);
    useEffect(() => {
        localStorage.setItem('cartList', []);
    }, []);

    const handleHoverImg = (id, isHovered) => {
        setHoveredProducts(prevState => ({
            ...prevState,
            [id]: isHovered
        }));
    }

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
            return localStorage.setItem('cartList', JSON.stringify(cart));
        }
        obj.quantity = 1;
        cart.push(obj);
        localStorage.setItem('cartList', JSON.stringify(cart));
    }

    return (
        <div className="pop-container">
            <div className="pop-head">
                <h3>{head}</h3>
                <div className="lst-pop">view all {'>>'}
                    {/* <img src={rArrow} alt='view more' /> */}
                </div>
            </div>
            <div className="pop-prod">
                {data.map((item) => {
                    const isHovered = !!hoveredProducts[item.product_id];
                    return (
                        <div onMouseEnter={() => handleHoverImg(item.product_id, true)} onMouseLeave={() => handleHoverImg(item.product_id, false)} className="product" key={item.product_id}>
                            <div className="prod-img-div">
                                <div className={`cartHovered ${isHovered ? "show" : ""}`}>
                                    <img className='viewDetailsImg' src={viewDetailsImg} alt="addToCart" title="view product page" />
                                </div>
                                <img src={`http://localhost:3001/uploads/${item.image}`} alt="product_photo" />
                            </div>
                            <div className="det">
                                <div>
                                    <h6>{item.product_name}</h6>
                                </div>
                                {/* <div className="description">
                                            <p>{item.description}</p>
                                        </div> */}
                            </div>
                            <div className='carting'>
                                <ReactStars classNames='starsRating'
                                    count={5}
                                    // onChange={ratingChanged}
                                    size={27}
                                    edit={false}
                                    value={4}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                                <div className="prod-q">
                                    <p>In stock: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="p-price">
                                <p>{item.price}$</p>
                                {/* <p className="discount_price">150$</p> */}
                            </div>
                            <button onClick={() => addToCart({ product_id: item.product_id, price: item.price, product_name: item.product_name, image: item.image })}>
                                Add to cart
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mx-2" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z"></path></svg>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}