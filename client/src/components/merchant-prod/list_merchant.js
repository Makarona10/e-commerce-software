import React, { useEffect, useState } from "react";
import { BrandBar } from "../brandBar/brandBar.js";
import { Nav_bar } from "../Navbar/Navbar.js";
import './list_merchant.css';
import photo from '../../imgs/1719547154542-377507952_2261275914061761_1401848363136747267_n.jpg'
import axios from "axios";
import { api } from "../../api/axios.js";


export const ListMerchant = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('http://localhost:3001/api/merchant')
            .then(res => {
                setProducts(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="lm-page">
            <BrandBar />
            <Nav_bar />
            <div className="merchant-container">
                <div>
                    {products.map((item, idx) => {
                        return (
                            <div className="merchant-card" key={idx}>
                                <div className="merchant-photo">
                                    <img src={item.image} alt="photo" />
                                </div>
                                <div className="det-div">
                                    <div className="det-merchant">
                                        <div className="name-merchant">
                                            <p>{item.product_name}</p>
                                        </div>
                                        <div className="price-merchant">
                                            <p>{item.price}$</p>
                                        </div>
                                        <div className="quantity-merchant">
                                            <p>{item.quantity} Peaces</p>
                                        </div>
                                    </div>
                                    <div className="desc-div">
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                                <div className="merchant-btns">
                                    <div>
                                        <button className="rem-mod">REMOVE</button>
                                        <button className="rem-mod">MODIFY</button>
                                        <button className="rem-mod">PREVIEW</button>
                                    </div>
                                </div>
                            </div>)
                    })}
                    <div className="merchant-card">
                        <div className="merchant-photo">
                            <img src={photo} alt="photo" />
                        </div>
                        <div className="det-div">
                            <div className="det-merchant">
                                <div className="name-merchant">
                                    <p>GTX 1660TI</p>
                                </div>
                                <div className="price-merchant">
                                    <p>270$</p>
                                </div>
                                <div className="quantity-merchant">
                                    <p>13 Peaces</p>
                                </div>
                            </div>
                            <div className="desc-div">
                                <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant or even if you want to fuck your wife while she is not there you can get in a video call with her using this card</p>
                            </div>
                        </div>
                        <div className="merchant-btns">
                            <div>
                                <button className="rem-mod">REMOVE</button>
                                <button className="rem-mod">MODIFY</button>
                                <button className="rem-mod">PREVIEW</button>
                            </div>
                        </div>
                    </div>
                    <div className="merchant-card">
                        <div className="merchant-photo">
                            <img src={photo} alt="photo" />
                        </div>
                        <div className="det-div">
                            <div className="det-merchant">
                                <div className="name-merchant">
                                    <p>GTX 1660TI</p>
                                </div>
                                <div className="price-merchant">
                                    <p>270$</p>
                                </div>
                                <div className="quantity-merchant">
                                    <p>13 Peaces</p>
                                </div>
                            </div>
                            <div className="desc-div">
                                <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant or even if you want to fuck your wife while she is not there you can get in a video call with her using this card</p>
                            </div>
                        </div>
                        <div className="merchant-btns">
                            <div>
                                <button className="rem-mod">REMOVE</button>
                                <button className="rem-mod">MODIFY</button>
                                <button className="rem-mod">PREVIEW</button>
                            </div>
                        </div>
                    </div>
                    <div className="merchant-card">
                        <div className="merchant-photo">
                            <img src={photo} alt="photo" />
                        </div>
                        <div className="det-div">
                            <div className="det-merchant">
                                <div className="name-merchant">
                                    <p>GTX 1660TI</p>
                                </div>
                                <div className="price-merchant">
                                    <p>270$</p>
                                </div>
                                <div className="quantity-merchant">
                                    <p>13 Peaces</p>
                                </div>
                            </div>
                            <div className="desc-div">
                                <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant or even if you want to fuck your wife while she is not there you can get in a video call with her using this card</p>
                            </div>
                        </div>
                        <div className="merchant-btns">
                            <div>
                                <button className="rem-mod">REMOVE</button>
                                <button className="rem-mod">MODIFY</button>
                                <button className="rem-mod">PREVIEW</button>
                            </div>
                        </div>
                    </div>
                    <div className="merchant-card">
                        <div className="merchant-photo">
                            <img src={photo} alt="photo" />
                        </div>
                        <div className="det-div">
                            <div className="det-merchant">
                                <div className="name-merchant">
                                    <p>GTX 1660TI</p>
                                </div>
                                <div className="price-merchant">
                                    <p>270$</p>
                                </div>
                                <div className="quantity-merchant">
                                    <p>13 Peaces</p>
                                </div>
                            </div>
                            <div className="desc-div">
                                <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant or even if you want to fuck your wife while she is not there you can get in a video call with her using this card</p>
                            </div>
                        </div>
                        <div className="merchant-btns">
                            <div>
                                <button className="rem-mod">REMOVE</button>
                                <button className="rem-mod">MODIFY</button>
                                <button className="rem-mod">PREVIEW</button>
                            </div>
                        </div>
                    </div>
                    <div className="merchant-card">
                        <div className="merchant-photo">
                            <img src={photo} alt="photo" />
                        </div>
                        <div className="det-div">
                            <div className="det-merchant">
                                <div className="name-merchant">
                                    <p>GTX 1660TI</p>
                                </div>
                                <div className="price-merchant">
                                    <p>270$</p>
                                </div>
                                <div className="quantity-merchant">
                                    <p>13 Peaces</p>
                                </div>
                            </div>
                            <div className="desc-div">
                                <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant or even if you want to fuck your wife while she is not there you can get in a video call with her using this card</p>
                            </div>
                        </div>
                        <div className="merchant-btns">
                            <div>
                                <button className="rem-mod">REMOVE</button>
                                <button className="rem-mod">MODIFY</button>
                                <button className="rem-mod">PREVIEW</button>
                            </div>
                        </div>
                    </div>
                    <div className="merchant-card">
                        <div className="merchant-photo">
                            <img src={photo} alt="photo" />
                        </div>
                        <div className="det-div">
                            <div className="det-merchant">
                                <div className="name-merchant">
                                    <p>GTX 1660TI</p>
                                </div>
                                <div className="price-merchant">
                                    <p>270$</p>
                                </div>
                                <div className="quantity-merchant">
                                    <p>13 Peaces</p>
                                </div>
                            </div>
                            <div className="desc-div">
                                <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant or even if you want to fuck your wife while she is not there you can get in a video call with her using this card</p>
                            </div>
                        </div>
                        <div className="merchant-btns">
                            <div>
                                <button className="rem-mod">REMOVE</button>
                                <button className="rem-mod">MODIFY</button>
                                <button className="rem-mod">PREVIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}