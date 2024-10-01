import React, { useState } from "react";
import './mod-inf.css';
import { api } from "../../api/axios";

export const ModifyStoreModal = ({ toggle, handleToggle, data}) => {
    const [storeInfo, setStoreInfo] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreInfo((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const send_info = (e) => {
        e.preventDefault()
        api.put('merchant/info', storeInfo)
            .then(res => {
                console.log(res)
                if (res.status === 200) return window.location.reload();
            })
            .catch(err => console.log(err));
    }
    return (
        <div className={`mod-store-pop ${toggle ? '' : 'hide'}`}>
            <div className="overlay">
                <h1>Update your store info.</h1>
                <button onClick={handleToggle}>x</button>
                <form>
                    <div className="up-mod-store">
                        <input type="text" name="name" placeholder="Store name"
                            onChange={(e) => handleChange(e)}
                            defaultValue={data.store_name}
                        />
                        <input type="text" name="location"
                            placeholder="Location ..." onChange={(e) => handleChange(e)}
                            defaultValue={data.location}
                        />
                    </div>
                    <div className="mod-about-store">
                        <textarea name="about" spellCheck={false}
                            placeholder="Tell about your store ...."
                            onChange={(e) => handleChange(e)}
                            defaultValue={data.about}/>
                    </div>
                    {/* <label htmlFor="chose-store-pic">Upload your store photo</label>
                    <input id='chose-store-pic' type="file" /> */}
                    <input type="text"
                        placeholder="Profile image url (https://www.photo.com) ex."
                        name="img" onChange={(e) => handleChange(e)}
                        defaultValue={data.img}
                    />
                    <button type="submit" onClick={send_info}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}
