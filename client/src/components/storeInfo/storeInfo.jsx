import React, { useEffect, useState } from "react";
import { BrandBar } from "../brandBar/brandBar.js";
import { NavBar } from "../Navbar/Navbar.js";
import './storeInfo.css';
import p from '../../imgs/1719547154542-377507952_2261275914061761_1401848363136747267_n.jpg';
import { MyFooter } from "../common/footer/footer.jsx";
import { ModifyStoreModal } from "../modify-store-inf/mod-inf.jsx";
import { api } from "../../api/axios.js";

export const StoreInfo = () => {
    const [toggle, setToggle] = useState(false);
    const [merchant, setMerchant] = useState({});

    const handleToggle = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        api.get('merchant/info')
            .then(res => {
                setMerchant(res.data.data[0]);
            })
    }, [])

    return (
        <div>
            <ModifyStoreModal toggle={toggle} handleToggle={handleToggle} data={merchant} />
            <BrandBar />
            <NavBar />
            <div className="store-inf-container">
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="feather feather-edit" fill="none" height="33"
                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                    strokeWidth="2" viewBox="0 0 24 24" width="33"
                    onClick={handleToggle}
                    title="modify store information">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <div className="upr-inf">
                    <div><img src={merchant.img} alt="Store logo" /></div>
                    <div>{merchant.store_name}</div>
                </div>
                <div className="inf-desc-div">
                    <h3>More information about the store</h3>
                    <p>{merchant.about}</p>
                </div>
                <div className="location-inf">
                    <h3>Store location</h3>
                    <p>{merchant.location}</p>
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
            <MyFooter />
        </div>
    )
}
