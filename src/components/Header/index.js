import {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
// import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import './index.css'
// import CartContext from '../../context/CartContext'

class Header extends Component {
  state = {
    showNavbar: false,
  }

  showMenu = () => {
    this.setState({showNavbar: true})
  }

  closeMenu = () => {
    this.setState({showNavbar: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  //   renderCount = () => (
  //     <CartContext.Consumer>
  //       {value => {
  //         const {cartList} = value
  //         const cartCount = cartList.length

  //         return cartCount > 0 && <span>{cartCount}</span>
  //       }}
  //     </CartContext.Consumer>
  //   )

  render() {
    const {showNavbar} = this.state
    return (
      <>
        <div className="nav-bar-large-container">
          <div className="row-align">
            <NavLink to="/" className="row-align ">
              <img
                className="header-website-logo"
                src="/img/TastyKitchenImage.png"
                alt="website logo"
              />
            </NavLink>
            <p className="nav-header">Tasty Kitchens</p>
          </div>
          <div className="header-rowalign">
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="selected"
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-menu-item">
                <NavLink
                  to="/cart"
                  activeClassName="selected"
                  className="nav-link"
                >
                  Cart
                </NavLink>
              </li>
            </ul>

            <button
              type="button"
              className="logout-desktop-btn"
              data-testid="iconButton"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="nav-mobile-container">
          <NavLink to="/">
            <img
              className="header-website-logo"
              src="/img/TastyKitchenImage.png"
              alt="website logo"
            />
          </NavLink>

          <p className="nav-mobile-header">Tasty Kitchens</p>
          {showNavbar ? (
            <AiOutlineClose onClick={this.closeMenu} className="ham-icon" />
          ) : (
            <GiHamburgerMenu onClick={this.showMenu} className="ham-icon" />
          )}
        </div>
        {showNavbar && (
          <div className="nav-menu-mobile">
            <ul className="nav-menu-list-mobile">
              <li className="nav-menu-item-mobile">
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="selected"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-menu-item-mobile">
                <NavLink
                  to="/cart"
                  className="nav-link"
                  activeClassName="selected"
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-menu-item-mobile">
                <button
                  type="button"
                  className="logout-mobile-btn"
                  data-testid="iconButton"
                  onClick={this.onClickLogout}
                >
                  <FiLogOut className="icon" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
