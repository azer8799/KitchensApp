import {AiFillCloseCircle} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {name, cost, id, imageUrl, quantity} = cartItemDetails

      const totalCost = cost * quantity
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      const onDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      const onIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      return (
        <li className="cart-item" testid="cartItem">
          <div className="image-container-align">
            <img className="cart-product-image" src={imageUrl} alt={name} />
            <h1 className="cart-product-title-lg">{name}</h1>
          </div>

          <h1 className="cart-product-title">{name}</h1>
          <div className="plus-minus-container">
            <button
              type="button"
              onClick={onDecrementQuantity}
              className="quantity-button"
              testid="decrement-quantity"
            >
              -
            </button>
            <div className="cart-item-desc" testid="item-quantity">
              {quantity}
            </div>
            <button
              type="button"
              onClick={onIncrementQuantity}
              className="quantity-button"
              testid="increment-quantity"
            >
              +
            </button>
          </div>

          <div className="price-icon-container">
            <p className="cart-total-price">
              <BiRupee className="rupee-icon" fill="#ffa412" />
              {totalCost}
            </p>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
              testid="remove"
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
