import React from "react";
import './container.css';
import photo from '../../imgs/1719547154542-377507952_2261275914061761_1401848363136747267_n.jpg'


export const ListProd = () => {
    return (
        <div className="container">
            <div className="product">
                <div>
                    <img src={photo} alt="photo" />
                </div>
                <div className="det">
                    <div>
                        <h6>GTX 1660 palit</h6>
                    </div>
                    <div className="description">
                        <p>This is a midrange graphics card for playing games</p>
                    </div>
                    <div>
                        <p>peaces left: 12</p>
                    </div>
                </div>
                <div className='carting'>
                    <p>220$</p>
                    <p>+</p>
                    <p>-</p>
                </div>
            </div>
            <div className="product">
                <div>
                    <img src={photo} alt="photo" />
                </div>
                <div className="det">
                    <div>
                        <h6>GTX 1660 palit</h6>
                    </div>
                    <div className="description">
                        <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant</p>
                    </div>
                    <div>
                        <p>peaces left: 12</p>
                    </div>
                </div>
                <div className='carting'>
                    <p>220$</p>
                    <p>+</p>
                    <p>-</p>
                </div>
            </div>
            <div className="product">
                <div>
                    <img src={photo} alt="photo" />
                </div>
                <div className="det">
                    <div>
                        <h6>GTX 1660 palit</h6>
                    </div>
                    <div className="description">
                        <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant</p>
                    </div>
                    <div>
                        <p>peaces left: 12</p>
                    </div>
                </div>
                <div className='carting'>
                    <p>220$</p>
                    <p>+</p>
                    <p>-</p>
                </div>
            </div>
            <div className="product">
                <div>
                    <img src={photo} alt="photo" />
                </div>
                <div className="det">
                    <div>
                        <h6>GTX 1660 palit</h6>
                    </div>
                    <div className="description">
                        <p>This is a midrange graphics card for playing games like GTAV, PUBG, The witcher 3 or even valorant or even if you want to fuck your wife while she is not there you can get in a video call with her using this card</p>
                    </div>
                    <div>
                        <p>peaces left: 12</p>
                    </div>
                </div>
                <div className='carting'>
                    <p>220$</p>
                    <p>+</p>
                    <p>-</p>
                </div>
            </div>
        </div>
    )
}