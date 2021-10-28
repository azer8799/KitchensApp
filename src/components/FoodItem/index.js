import './index.css'
import {Component} from 'react'
// import {FaRupeeSign} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
// import Counter from '../Counter'

class FoodItem extends Component {
  state = {
    quantity: 0,
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value
          const {quantity} = this.state
          const {foodDetails} = this.props

          const {
            name,
            cost,
            /* foodType, */
            imageUrl,
            rating,
            id,
          } = foodDetails

          const onAddToCart = () => {
            this.setState(
              prevState => ({
                quantity: prevState.quantity + 1,
              }),
              addCartItem({...foodDetails, quantity: 1}),
            )
          }

          const onDecrementQuantity = () => {
            if (quantity > 0) {
              this.setState(
                prevState => ({quantity: prevState.quantity - 1}),
                decrementCartItemQuantity(id),
              )
            }
          }

          const onIncrementQuantity = () => {
            this.setState(
              prevState => ({quantity: prevState.quantity + 1}),
              incrementCartItemQuantity(id),
            )
          }

          return (
            <li className="food-item" testid="foodItem">
              <div className="card-image-container">
                <img
                  src={imageUrl}
                  alt="food item"
                  className="food-item-image"
                />
                <div className="card-content-align">
                  <h1 className="food-item-title">{name}</h1>

                  <span className="food-item-desc">
                    <BiRupee className="rupee-icon" /> {cost} /-
                  </span>

                  <div className="rating-container">
                    <AiFillStar fill="#FFCC00" className="star-icon" />
                    <span className="food-item-rating">{rating}</span>
                  </div>
                  {quantity === 0 ? (
                    <button
                      className="add-button"
                      type="button"
                      onClick={onAddToCart}
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="plus-minus-container">
                      <button
                        type="button"
                        onClick={onDecrementQuantity}
                        className="quantity-button"
                        testid="decrement-count"
                      >
                        -
                      </button>
                      <div className="quantity-desc" testid="active-count">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        onClick={onIncrementQuantity}
                        className="quantity-button"
                        testid="increment-count"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodItem
