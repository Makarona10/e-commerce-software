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
        <div>
            <h1>
                PAYMENT DONE SUCCESSFULLY!
            </h1>
                <a href="http://localhost:3000">Head back to us</a>
        </div>
    )
}