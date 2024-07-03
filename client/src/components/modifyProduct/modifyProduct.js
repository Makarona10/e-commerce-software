import React from "react";
import { BrandBar } from "../brandBar/brandBar";
import { Nav_bar } from "../Navbar/Navbar";
import './modifyProduct.css';

export const ModifyProduct = () => {
    return (
        <div>
            <BrandBar />
            <Nav_bar search={false} />
            <div className="mod-form">
                <form>
                    <div>
                        <div>
                            <label htmlFor="price">Price:</label>
                            <input type="text" name="price" id="price" />
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity:</label>
                            <input className="quaninput" name="quantity" id="quantity" />
                        </div>
                    </div>
                    <div className="middle">
                        <div>
                            <label htmlFor="description">Describe your product:</label>
                            <textarea name="description" id="descript"></textarea>
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