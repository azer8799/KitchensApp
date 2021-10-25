import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
// import CartSummary from '../CartSummary'

import './index.css'
import CartSummary from '../CartSummary'
import Footer from '../Footer'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="cart-sum-container">
                  <CartSummary />
                </div>
              </div>
            )}
          </div>
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
