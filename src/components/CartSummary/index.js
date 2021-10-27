import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <div className="cart-summary-container">
          <h1 className="order-total-desc">Order Total:</h1>
          <div className="cart-total-container">
            <p className="summary-total-price" testid="total-price">
              Rs {total}
            </p>
            <Link to="/payment">
              <button type="button" className="place-order-button">
                Place Order
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
