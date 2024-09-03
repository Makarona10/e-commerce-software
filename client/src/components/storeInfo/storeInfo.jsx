import React, { useEffect, useState } from "react";
import { BrandBar } from "../brandBar/brandBar.js";
import { Nav_bar } from "../Navbar/Navbar.js";
import './storeInfo.css';
import { api } from "../../api/axios.js";
import p from '../../imgs/1719547154542-377507952_2261275914061761_1401848363136747267_n.jpg'


export const StoreInfo = () => {

    // useEffect(() => {
    //     api.get()
    // }, [])

    return (
        <div>
            <BrandBar />
            <Nav_bar />
            <div className="store-inf-container">
                <div className="upr-inf">
                    <div><img src={p} alt="Store logo" /></div>
                    <div>Store name</div>
                </div>
                <div className="inf-desc-div">
                    <h3>More information about the store</h3>
                    <p>The goddamn store description paragraph</p>
                </div>
                <div className="location-inf">
                    <h3>Store location</h3>
                    <p>Location text here</p>
                </div>
                <div className="ownrs-sec">
                    <h3>Owners</h3>
                    <ul>
                        <li>A7MED SE7EN</li>
                        <li>OMAR MOHAMMED HAMDI</li>
                        <li>EHABO YA3KOBO</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}