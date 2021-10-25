import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="empty-view-container">
    <img src="/img/Cooking.png" className="cart-empty-image" alt="empty cart" />
    <h1 className="empty-cart-heading">No Order Yet!</h1>
    <p className="empty-cart-desc">
      Your cart is empty. Add something from the menu.
    </p>

    <Link to="/">
      <button type="button" className="order-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
