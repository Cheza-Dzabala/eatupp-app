import React, { useState } from 'react'
import banner_image from '../../images/banner_image.png'
import LineIcon from "react-lineicons";


const orderTypes = [
    {
        'id': 1,
        'label': 'Delivery',
        'icon': 'service'
    },
    {
        id: 2,
        'label': 'Pickup',
        'icon': 'restaurant'
    },
];
function Banner() {
    const [orderType, setOrderType] = useState(0);

    return <div className="banner">
        <div className="banner-content">
            <div className="banner-text">
                <p className="banner-heading-text">
                    Loooking for a Snack?
                </p>
                <p className="banner-sub-text">Within a few clicks, find meals near you!</p>

                <div className="banner-card">
                    <div className="card-heading">
                        {
                            orderTypes.map((type) => {
                                let isType = orderType === type.id ? 'order-type-selected' : '';
                                return <div className={`order-type ${isType}`} onClick={() => setOrderType(type.id)}>
                                    <LineIcon name={type.icon} />
                                    <p>{type.label}</p>
                                </div>;
                            })
                        }
                    </div>
                    <div className="card-content">
                        <div className="row">
                            <input type="text" className="text-input" placeholder="What can we help you find today?" />
                            <button className="login-button">
                                <LineIcon name="search" /> {"   "}
                                Find Food
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="banner-image">
                <img src={banner_image} alt="Display food" />
            </div>
        </div>

    </div>
}

export default Banner
