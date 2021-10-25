import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const localStorageCartList = localStorage.getItem('cartData')
      const parsedCartList = JSON.parse(localStorageCartList)

      return (
        <>
          <div className="cart-list-align">
            <p className="table-header"> Item </p>
            <p className="table-header header-quantity"> Quantity </p>
            <p className="table-header"> Price </p>
          </div>

          <ul className="cart-list">
            {parsedCartList.map(eachCartItem => (
              <CartItem
                key={eachCartItem.id}
                cartItemDetails={eachCartItem}
                value={value}
              />
            ))}
          </ul>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
