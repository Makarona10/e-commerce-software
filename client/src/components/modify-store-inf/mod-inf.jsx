import React, { useEffect, useRef, useState } from "react";
import './mod-inf.css';
import { api } from "../../api/axios";

export const ModifyStoreModal = ({ toggle, handleToggle, data }) => {
    const [storeInfo, setStoreInfo] = useState({
        name: data.store_name,
        location: data.location,
        about: data.about,
        description: data.description
    });

    const [theImage, setTheImage] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsFileUploaded(true);
            setTheImage(file);
        } else {
            setIsFileUploaded(false);
        }
    };

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreInfo((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const send_info = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', storeInfo.name || data.store_name);
        formData.append('location', storeInfo.location || data.location);
        formData.append('about', storeInfo.about || data.about);
        formData.append('description', storeInfo.description || data.description);
        if (theImage) {
            formData.append('photo', theImage);
        }

        api.put('merchant/info', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res => {
            if (res.status === 200) return window.location.reload();
        }).catch(err => console.error(err));
    }

    return (
        <div className={`mod-store-pop ${toggle ? '' : 'hide'}`}>
            <div className="overlay">
                <h1>Update your store info.</h1>
                <button onClick={handleToggle}>x</button>
                <form onSubmit={send_info}>
                    <div className="up-mod-store">
                        <input type="text" name="name" placeholder="Store name"
                            onChange={(e) => handleChange(e)}
                            defaultValue={storeInfo.name}
                        />
                        <input type="text" name="location"
                            placeholder="Location (City, District, Block, Street, Building) ex." onChange={(e) => handleChange(e)}
                            defaultValue={storeInfo.location}
                        />
                    </div>
                    <div className="mod-about-store">
                        <textarea name="about" spellCheck={false}
                            placeholder="Tell about your store ...."
                            onChange={(e) => handleChange(e)}
                            defaultValue={storeInfo.about} />
                    </div>
                    <div className="file-input-wrapper flex-col justify-center items-center">
                        {isFileUploaded ? (
                            <p>Uploaded!</p>
                        ) : (
                            <p>Upload your store photo</p>
                        )}
                        <button
                            type="button"
                            className="file-input-button "
                            onClick={handleFileButtonClick}
                        >
                            Choose photo
                        </button>
                        <input
                            type="file"
                            name="photo"
                            id="upload-image"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}
