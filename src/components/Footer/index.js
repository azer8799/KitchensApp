// import {Component} from 'react'

import {
  FaInstagramSquare,
  FaTwitter,
  FaFacebookSquare,
  FaPinterestSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-img-container">
        <img
          src="/img/FooterLogo.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading"> Tasty Kitchens</h1>
      </div>
      <p className="footer-desc">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footer-icon-container">
        <FaPinterestSquare
          className="footer-icon"
          fill="#ffff"
          testid="pintrest-social-icon"
        />
        <FaInstagramSquare
          className="footer-icon"
          fill="#ffff"
          testid="instagram-social-icon"
        />
        <FaTwitter
          className="footer-icon"
          fill="#ffff"
          testid="twitter-social-icon"
        />
        <FaFacebookSquare
          className="footer-icon"
          fill="#ffff"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
