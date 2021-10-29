import React from 'react'
import { specialOne } from '../../data/special';

function SpecialOfTheDay() {
    return <div className="special-of-the-day">
        <div className="split pad">
            <p className="banner-heading-text">Today's Special!</p>
            <span className="centered">
                <p className="title">{specialOne.name}</p>
                <p className="sub-title ">{specialOne.description}</p>
            </span>
            <button className="button-white">Order Now</button>
        </div>
        <div className="split">
            <div className="image-holder">
                <img src={specialOne.image} alt={specialOne.name} className="special-image" />
            </div>
        </div>

    </div>
}

export default SpecialOfTheDay
