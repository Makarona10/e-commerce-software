import React, { useEffect, useState } from "react";
import { BrandBar } from "../brandBar/brandBar.js";
import { NavBar } from "../Navbar/Navbar.js";
import { api } from "../../api/axios.js";
import p from '../../imgs/1719547154542-377507952_2261275914061761_1401848363136747267_n.jpg'
import './mer-best.css';
import { MyFooter } from "../common/footer/footer.jsx";

export const MerchantBestSellers = () => {
    const [prod, setProd] = useState([]);

    useEffect(() => {
        api.get('merchant/best')
            .then(result => {
                setProd(result.data.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="mer-bst-body">
            <BrandBar />
            <NavBar />
            <div className="bst-sell-head">BEST SELLERS OF YOUR STORE</div>
            <div className="mer-bst-cont">
                {prod.map((item, idx) => {
                    return (
                        <div className="mer-bst-card" key={idx}>
                            <div className="mer-bst-img">
                                <img src={`http://localhost:3001/uploads/${item.image}`} />
                            </div>
                            <div className="bst-scnd">
                                <div>#{idx + 1}</div>
                                <div>{item.product_name}</div>
                            </div>
                            <div className="bst-thrd">
                                <div>{item.sell_times} pieces sold</div>
                                <div>unit price: ${item.price}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <MyFooter />
        </div>
    )
}