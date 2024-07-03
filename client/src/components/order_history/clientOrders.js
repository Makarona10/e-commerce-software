import React, { useState } from "react";
import { Nav_bar } from "../Navbar/Navbar";
import './clientOrders.css';
import { BrandBar } from "../brandBar/brandBar";

export const ClientOrders = () => {
    const [prevVisible, setPrevVisible] = useState(false)

    const showPrev = () => {
        setPrevVisible(!prevVisible);
    }

    return (
        <div className="orders-history">
            <BrandBar />
            <Nav_bar />
            <div className={`prev-window ${prevVisible ? 'show' : ''}`}>
                <div>
                    <div className="x-button" onClick={showPrev}></div>
                        <div></div>
                        <div></div>
                    <div>
                    </div>
                </div>
            </div>
            <div className="history-container">
                <div className="order-card">
                    <div className="order-det">
                        <div><p>Order id: 1548</p></div>
                        <div>Address: Giza-Ghaly omar street</div>
                        <div><p>amount: 97$</p></div>
                        <div><p>Order date: 14/11/2028</p></div>
                    </div>
                    <div className="r-card">
                        <div>
                            <div className="ord-stat">
                                <p className="order-status">ACCEPTED</p>
                            </div>
                        </div>
                        <div>
                            <div className="cancel-btn">
                                <button>CANCEL</button>
                            </div>
                        </div>
                        <div>
                            <div className="preview-btn">
                                <button onClick={showPrev}>PREVIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-card">
                    <div className="order-det">
                        <div><p>Order id: 1548</p></div>
                        <div>Address: Giza-Ghaly omar street</div>
                        <div><p>amount: 97$</p></div>
                        <div><p>Order date: 14/11/2028</p></div>
                    </div>
                    <div className="r-card">
                        <div>
                            <div className="ord-stat">
                                <p className="order-status">ACCEPTED</p>
                            </div>
                        </div>
                        <div>
                            <div className="cancel-btn">
                                <button>CANCEL</button>
                            </div>
                        </div>
                        <div>
                            <div className="preview-btn">
                                <button>PREVIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-card">
                    <div className="order-det">
                        <div><p>Order id: 1548</p></div>
                        <div>Address: Giza-Ghaly omar street</div>
                        <div><p>amount: 97$</p></div>
                        <div><p>Order date: 14/11/2028</p></div>
                    </div>
                    <div className="r-card">
                        <div>
                            <div className="ord-stat">
                                <p className="order-status">ACCEPTED</p>
                            </div>
                        </div>
                        <div>
                            <div className="cancel-btn">
                                <button>CANCEL</button>
                            </div>
                        </div>
                        <div>
                            <div className="preview-btn">
                                <button>PREVIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-card">
                    <div className="order-det">
                        <div><p>Order id: 1548</p></div>
                        <div>Address: Giza-Ghaly omar street</div>
                        <div><p>amount: 97$</p></div>
                        <div><p>Order date: 14/11/2028</p></div>
                    </div>
                    <div className="r-card">
                        <div>
                            <div className="ord-stat">
                                <p className="order-status">ACCEPTED</p>
                            </div>
                        </div>
                        <div>
                            <div className="cancel-btn">
                                <button>CANCEL</button>
                            </div>
                        </div>
                        <div>
                            <div className="preview-btn">
                                <button>PREVIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-card">
                    <div className="order-det">
                        <div><p>Order id: 1548</p></div>
                        <div>Address: Giza-Ghaly omar street</div>
                        <div><p>amount: 97$</p></div>
                        <div><p>Order date: 14/11/2028</p></div>
                    </div>
                    <div className="r-card">
                        <div>
                            <div className="ord-stat">
                                <p className="order-status">ACCEPTED</p>
                            </div>
                        </div>
                        <div>
                            <div className="cancel-btn">
                                <button>CANCEL</button>
                            </div>
                        </div>
                        <div>
                            <div className="preview-btn">
                                <button>PREVIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="order-card">
                    <div className="order-det">
                        <div><p>Order id: 1548</p></div>
                        <div>Address: Giza-Ghaly omar street</div>
                        <div><p>amount: 97$</p></div>
                        <div><p>Order date: 14/11/2028</p></div>
                    </div>
                    <div className="r-card">
                        <div>
                            <div className="ord-stat">
                                <p className="order-status">ACCEPTED</p>
                            </div>
                        </div>
                        <div>
                            <div className="cancel-btn">
                                <button>CANCEL</button>
                            </div>
                        </div>
                        <div>
                            <div className="preview-btn">
                                <button>PREVIEW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}