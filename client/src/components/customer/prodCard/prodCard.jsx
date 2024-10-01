import React, { useEffect, useState } from "react";
import './productCard.css';
import viewDetailsImg from '../../../imgs/viewDetails.png';
import ReactStars from 'react-rating-stars-component';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from "react-router";
import { addToCart, updateCart } from "../../common/addToCart/addToCart";


export const ProdCard = ({ head, data, viewAll }) => {
    const [hoveredProducts, setHoveredProducts] = useState(false);
    const navigate = useNavigate();

    const handleHoverImg = (id, isHovered) => {
        setHoveredProducts(prevState => ({
            ...prevState,
            [id]: isHovered
        }));
    }


    //Heads to product details page
    const viewDetails = (id) => {
        navigate(`/prod-info?${`id=${id}`}`);
    }

    return (
        <div className="pop-container">
            <div className="pop-head">
                <h3>{head}</h3>
                <div className="lst-pop">
                    {viewAll ? 'view all >>' : ''}
                </div>
            </div>
            <div className="pop-prod">
                {data.map((item) => {
                    const isHovered = !!hoveredProducts[item.id];
                    return (
                        <div onMouseEnter={() => handleHoverImg(item.id, true)}
                            onMouseLeave={() => handleHoverImg(item.id, false)}
                            className="product" key={item.id}
                        >
                            <div className="prod-img-div">
                                <div className={`cartHovered ${isHovered ? "show" : ""}`}>
                                    <img className='viewDetailsImg'
                                        src={viewDetailsImg}
                                        alt="add to cart"
                                        title="view product page"
                                        onClick={() => viewDetails(item.id)} />
                                </div>
                                <img src={`http://localhost:3001/uploads/${item.image}`} alt="product_photo" />
                            </div>
                            <div className="det">
                                <div>
                                    <h6>{item.product_name}</h6>
                                </div>
                            </div>
                            <div className='carting'>
                                <ReactStars classNames='starsRating'
                                    count={5}
                                    size={20}
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
                                <p>{item.offer ? item.offer : item.price}$</p>
                                <p className="discount_price ml-6">{item.offer ? `${item.price}$` : ''}</p>
                            </div>
                            <button
                                onClick={() => {
                                    addToCart({
                                        id: item.id,
                                        price: item.price,
                                        product_name: item.product_name,
                                        image: item.image,
                                        pieces_left: item.quantity
                                    });
                                }}
                            >
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