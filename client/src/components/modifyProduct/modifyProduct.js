import React, { useEffect, useState } from "react";
import { BrandBar } from "../brandBar/brandBar";
import { Nav_bar } from "../Navbar/Navbar";
import './modifyProduct.css';

export const ModifyProduct = (props) => {
    const [newInfo, setNewInfo] = useState([]);

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <BrandBar />
            <Nav_bar search={false} />
            <div className="mod-form">
                <form>
                    <div>
                        <div>
                            <label htmlFor="price">Price:</label>
                            <input type="text" name="price" id="price" value={props.price}/>
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity:</label>
                            <input className="quaninput" name="quantity" id="quantity" value={props.quantity}/>
                        </div>
                    </div>
                    <div className="middle">
                        <div>
                            <label htmlFor="description">Describe your product:</label>
                            <textarea name="description" id="descript" value={props.description}></textarea>
                        </div>
                    </div>
                    <div className="lower">
                    </div>
                    <div>
                        <button type="submit">Publish product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}