import React from 'react'

function Footer() {
    return <div className="footer">
        <div className="footer-section">
            <p className="footer-section-head">About Us</p>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse cupiditate labore quasi a asperiores corrupti, quos fugit assumenda dolorum eveniet totam enim deserunt dolorem? Nisi, inventore. Minus ipsa, labore nostrum ducimus nemo ipsam nam rem dignissimos eveniet iste illum qui magni odit quas minima sunt optio quam dolorum blanditiis obcaecati?
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse cupiditate labore quasi a asperiores corrupti, quos fugit assumenda dolorum eveniet totam enim deserunt dolorem? Nisi, inventore. Minus ipsa, labore nostrum ducimus nemo ipsam nam rem dignissimos eveniet iste illum qui magni odit quas minima sunt optio quam dolorum blanditiis obcaecati?
            </p>

        </div>
        <div className="footer-section">
            <p className="footer-section-head">Social Media</p>
        </div>
        <div className="footer-section">
            <p className="footer-section-head">Subscribe</p>
            <p>Get new specials and promotions to your email address</p>
            <input type="text" className="text-input w-full" placeholder="Email Address" />
            <button className="login-button">Subscribe</button>
        </div>
        <div className="footer-section">
            <p className="footer-section-head">
                Contact Us
            </p>
        </div>

    </div>
}

export default Footer
