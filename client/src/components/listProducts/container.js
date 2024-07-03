import React, { useEffect, useState } from "react";
import './container.css';
import photo from '../../imgs/1719547154542-377507952_2261275914061761_1401848363136747267_n.jpg'
import axios from 'axios';


export const ListProd = () => {

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/products/')
            .then(res => {
                setProductsData(res.data)
            })

    }, [])
    console.log(productsData)
    const dir = 'D:\/shipping system\/server\/uploads\/'
    return (
        <div className="container">
            {productsData.map((item, idx) => {
                return (
                    <div className="product" key={idx}>
                        <div>
                            <img src={`${dir}${item.image}`} alt="photo" />
                            {console.log(`${dir}${item.image}`)}
                        </div>
                        <div className="det">
                            <div>
                                <h6>{item.product_name}</h6>
                            </div>
                            <div className="description">
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <p>peaces left: {item.quantity}</p>
                            </div>
                        </div>
                        <div className='carting'>
                            <p>{item.price}$</p>
                            <p>+</p>
                            <p>-</p>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}