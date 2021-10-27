import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onShowPasswordState = () => {
    this.setState({showPassword: true})
  }

  onHidePasswordState = () => {
    this.setState({showPassword: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showSubmitError,
      errorMsg,
      showPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.onFormSubmit}>
          <img
            src="/img/TastyKitchenImage.png"
            className="website-logo"
            alt="website logo"
          />

          <img
            src="/img/LandingSmall.png"
            alt="website login"
            className="landing-small-img"
          />
          <h1 className="logo-heading"> Tasty Kitchens </h1>
          <h1 className="login-heading"> Login </h1>
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>

          <input
            type="text"
            id="username"
            className="input"
            value={username}
            onChange={this.onChangeUsername}
            placeholder="Username"
          />
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <div className="login-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="password-input"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />

            {showPassword ? (
              <AiFillEye
                className="eye-icon"
                onClick={this.onHidePasswordState}
              />
            ) : (
              <AiFillEyeInvisible
                className="eye-icon"
                onClick={this.onShowPasswordState}
              />
            )}
          </div>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <img
          src="/img/LandingImage.png"
          alt="website login"
          className="landing-image"
        />
      </div>
    )
  }
}

export default LoginForm
