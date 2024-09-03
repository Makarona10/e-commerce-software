import React, { useEffect, useState } from "react";
import './container.css';
import { ProdCard } from '../prodCard/prodCard'
import { api } from '../../../api/axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-slideshow-image/dist/styles.css';

export const LandingPage = () => {

    const [productsData, setProductsData] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);

    useEffect(() => {
        api.get('products/list-latest', { params: { page: 1 } })
            .then(res => {
                setProductsData((res.data).slice(0, 8));
            });
        api.get('products/list-popular', {params: { page: 1}})
            .then(res => {
                setPopularProducts((res.data).slice(0, 8))
            })
    }, [])

    useEffect(() => {
        localStorage.setItem('cartList', []);
    }, []);

    const categories = ["Gaming", "Music", "Sports", "Movies", "Furniture", "Mobiles", "Wearings", "Books"];
    const imgs = ["https://cdn.pixabay.com/photo/2024/01/25/06/56/gaming-logo-8531082_640.png",
        "https://cdn.dribbble.com/users/3547568/screenshots/14395014/music_jpeg_4x.jpg",
        "https://media.npr.org/assets/img/2020/06/10/gettyimages-200199027-001-77516efa4fe5d700d23be705ce64c89a3471910c.jpg",
        "https://media.istockphoto.com/id/1642381175/vector/cinema.jpg?s=612x612&w=0&k=20&c=owIct55daWlWRwPbTYLI9Y1IsrgYiqJcpvvgycvxBhE=",
        "https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg",
        "https://www.hughesandco.com/wp-content/uploads/2014/12/blog_logo-design.jpg",
        "https://img.freepik.com/premium-vector/white-man-logo-design-man-with-suit-hat_498048-816.jpg",
        "https://i.pinimg.com/originals/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.png",
    ]

    const handleCategHover = (index) => {
        setHoveredCategoryIndex(index);
    }


    return (
        <div className="browse-body">
            <div className="banner">
                <div className="lft-banner">YOU CLICK</div>
                <img src={'https://cdn.shopify.com/s/files/1/0070/7032/files/ecommerce_20checkout.png?v=1691774808'} />
                <div className="right-banner">WE DELIVER</div>
            </div>

            <ProdCard head="Recently released" data={productsData} />

            <div className="ctg-lst-circles" style={{ marginTop: '0px' }}>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => handleCategHover(index)}
                        onMouseLeave={() => handleCategHover(null)}
                    >
                        <div className="ctg-circle">
                            <img src={imgs[index]} alt={`${category} category`} />
                        </div>
                        <div className={hoveredCategoryIndex === index ? 'purpleTag' : 'non-hovered'}>
                            {category}
                        </div>
                    </div>
                ))}
            </div>
            <div className="offer-pic">
                <img src={'https://marketplace.canva.com/EAE6uxzge6c/1/0/1600w/canva-yellow-and-white-minimalist-big-sale-banner-BjBIq-T_6j4.jpg'} />
            </div>
            <ProdCard head="Best sellers" data={popularProducts} />
        </div>
    )
}