import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header'

import './index.css'
import Footer from '../Footer'
import RestaurantCarousel from '../RestaurantCarousel'
import RestaurantsList from '../RestaurantsList'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <RestaurantCarousel />
        <RestaurantsList />
      </div>
      <Footer />
    </>
  )
}

export default Home
