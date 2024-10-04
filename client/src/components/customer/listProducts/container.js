import React, { useEffect, useState } from "react";
import './container.css';
import { ProdCard } from '../prodCard/prodCard'
import { api } from '../../../api/axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-slideshow-image/dist/styles.css';
import sc from '../../../imgs/shop_cases.jpg'

export const LandingPage = () => {

    const [productsData, setProductsData] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [offerProducts, setOfferProducts] = useState([]);
    const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);

    useEffect(() => {
        api.get('products/list-latest', { params: { page: 1 } })
            .then(res => {
                setProductsData((res.data.data).slice(0, 8));
            }).catch();
        api.get('products/list-popular', { params: { page: 1 } })
            .then(res => {
                setPopularProducts((res.data.data).slice(0, 8))
            }).catch()
        api.get('products/list-offers', { params: { page: 1 } })
            .then(res => {
                setOfferProducts((res.data.data).slice(0, 8))
            }).catch()
    }, [])


    const handleCategHover = (index) => {
        setHoveredCategoryIndex(index);
    }


    return (
        <div>
            <div className="banner">
                {/* <div className="lft-banner">YOU CLICK</div> */}
                <div>
                    <img src={'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/ampere/30-series/back-in-stock/geforce-back-in-stock-refresh-og-1200x630-cppy@2x.jpg'}
                        alt='ads' />
                </div>
                <div>
                    <img className="sq-ads" src={sc} alt="amd"/>
                    <img src="https://storage-asset.msi.com/global/picture/news/2020/nb/alpha15-20200907-1.jpg"
                        className="w-28 h-58" alt='banner'/>
                    {/* <img /> */}
                </div>
                {/* <img src={banner} alt="banner"/> */}
                {/* <div className="right-banner">WE DELIVER</div> */}
            </div>

            <ProdCard head="Recently released" data={productsData} viewAll={true} />

            {/* <div className="offer-pic">
                <img
                    src={'https://marketplace.canva.com/EAE6uxzge6c/1/0/1600w/canva-yellow-and-white-minimalist-big-sale-banner-BjBIq-T_6j4.jpg'}
                    alt='offers' />
            </div> */}
            <ProdCard head="Best sellers" data={popularProducts} viewAll={true} />
            <div className="flex justify-center ">
                <img src='https://storage-asset.msi.com/global/picture/news/2021/monitor/black-friday-20211028-1.jpg'
                alt='msi' className="rounded-sm h-56"/>
            </div>
            <ProdCard head="Offers" data={offerProducts} viewAll={true} />
        </div>
    )
}