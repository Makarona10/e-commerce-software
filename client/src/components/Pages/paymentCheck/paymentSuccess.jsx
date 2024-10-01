import React, { useEffect } from "react";
import { api } from "../../../api/axios";



export const PaymentHandle = () => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const specificParam = params.get('id')



    useEffect(() => {
        api.post(`customer/payment/${parseInt(specificParam)}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="bg-white h-screen text-2xl">
            <h1 className="my-100 mt-64">
                PAYMENT DONE SUCCESSFULLY!
            </h1>
            <a href="http://localhost:3000" className="underline text-blue-500">Head back to us</a>
        </div>
    )
}