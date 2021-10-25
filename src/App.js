import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'
import CartContext from './context/CartContext'

import './App.css'
import PaymentsPage from './components/PaymentsPage'

const getCartList = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedList = JSON.parse(stringifiedCartList)
  if (parsedList === null) {
    return []
  }
  return parsedList
}

class App extends Component {
  state = {
    cartList: getCartList(),
  }

  addCartItem = foodData => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === foodData.id,
    )
    // console.log(productObject)
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + foodData.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, foodData]
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const updatedList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updatedQuantity = eachItem.quantity + 1
          return {
            ...eachItem,
            quantity: updatedQuantity,
          }
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObj = cartList.find(eachItem => eachItem.id === id) // item added in cart. We use this to get quantity
    console.log(productObj)
    if (productObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const updatedQuantity = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id) // if the product is less than 1 then remove it from cart
    }
  }

  render() {
    const {cartList} = this.state

    localStorage.setItem('cartData', JSON.stringify(cartList))

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/payment" component={PaymentsPage} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
