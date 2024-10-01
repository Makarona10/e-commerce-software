import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import './prod_inf.css'
import { BrandBar } from "../../brandBar/brandBar";
import { NavBar } from "../../Navbar/Navbar";
import { MyFooter } from "../../common/footer/footer";
import { addToCart, updateCart } from "../../common/addToCart/addToCart";
import { useEffect, useState } from "react";
import { api } from "../../../api/axios";
import queryString from 'query-string';


const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [productReviews, setProductReviews] = useState([])
    const { id } = queryString.parse(window.location.search);

    useEffect(() => {
        api.get(`products/details/${id}`)
            .then(res => {
                setProduct(res.data.data[0]);
                console.log(res.data.data);
            }).catch();

        api.get(`products/reviews/${id}`)
            .then(res => {
                setProductReviews((res.data.data).slice(0, 20));
            }).catch();
    }, [id]);

    const plusMinuceButton =
        "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
    return (
        <div className="">
            <BrandBar />
            <NavBar />
            <section className="sec-inf container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
                {/* image gallery */}
                <div className="container mx-auto px-4">
                    <img src={`http://localhost:3001/uploads/${product.image}`} alt='Product_photo' />
                </div>

                <div className="px-5 lg:px text-left">
                    <h2 className="pt-3 text-2xl font-bold lg:pt-0 text-slate-100">
                        {product.product_name}
                    </h2>
                    <div className="mt-1">
                        <div className="flex items-center">
                            <Rater
                                style={{ fontSize: "30px" }}
                                total={5}
                                interactive={false}
                                rating={product.rating}
                            />
                        </div>
                    </div>
                    <p className="mt-5 font-bold text-slate-300">
                        Availability:{" "}
                        {product.quantity > 0 ? (
                            <span className="text-green-600">In Stock </span>
                        ) : (
                            <span className="text-red-600">Out of stock</span>
                        )}
                    </p>
                    <p className="font-bold text-slate-300">
                        Brand: <span className="font-normal">A temporary brand</span>
                    </p>

                    <p className="mt-4 text-4xl font-bold text-violet-900 text-indigo-400">
                        ${product.offer ?
                            product.offer : product.price
                        }{" "}
                        <span className="text-xs text-gray-400 line-through">
                            ${product.price}
                        </span>
                    </p>
                    <p className="pt-5 text-1xl leading-5 text-slate-400">
                        {product.description}
                    </p>
                    <div className="mt-6">
                        <p className="pb-2 text-xs text-gray-200">Quantity</p>
                        <div className="flex">
                            <button className={`${plusMinuceButton} text-gray-200`}>−</button>
                            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500 text-gray-200">
                                1
                            </div>
                            <button className={`${plusMinuceButton} text-gray-200`}> +</button>
                        </div>
                    </div>
                    <div className="mt-7 flex flex-row items-center gap-6">
                        <button
                            className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
                            onClick={() => { addToCart(product); updateCart() }}>
                            <BiShoppingBag className="mx-2" />
                            Add to cart
                        </button>
                        <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
                            <AiOutlineHeart className="mx-2" />
                            Wishlist
                        </button>
                    </div>
                </div>
            </section>
            <div style={{ 'width': 1300 }} className="m-auto flex flex-col">
                <h1 className="flex text-white text-2xl mb-4 underline underline-offset-4">REVIEWS</h1>
                {productReviews.map(review => {
                    return (
                        <div className="flex flex-col mt-6" key={review.id}>
                            <div className="flex">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKgRYbu4MBQV0AcwfDUJT9Xt9bnGKENwdrA&s"
                                    alt="prof-pic"
                                    className="w-14 h-14 rounded-full bg-white"
                                />
                                <div className="flex-col text-white ml-4 mt-1">
                                    <div>{review.first_name} {review.last_name}</div>
                                    <div className="flex">
                                        <Rater
                                            style={{ fontSize: "24px" }}
                                            total={5}
                                            interactive={false}
                                            rating={review.rating}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        {review.comment}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <MyFooter />
        </div>
    );
};

export { ProductDetail };