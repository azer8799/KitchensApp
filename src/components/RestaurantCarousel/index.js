import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

// import ProductCard from '../ProductCard'
import CarouselItem from '../CarouselItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantCarousel extends Component {
  state = {
    restaurantOffers: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantOffers()
  }

  getRestaurantOffers = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.offers.map(product => ({
        id: product.id,
        imageUrl: product.image_url,
      }))
      this.setState({
        restaurantOffers: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderOffersListView = () => {
    const {restaurantOffers} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    }
    return (
      <div>
        <ul className="products-list">
          <Slider {...settings}>
            {restaurantOffers.map(eachPlanet => (
              <CarouselItem carouselDetails={eachPlanet} key={eachPlanet.id} />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }

  renderOffersFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  renderLoadingView = () => (
    <div
      className="carousel-loader-container"
      testid="restaurants-offers-loader"
    >
      <Loader type="TailSpin" color="#f7931e" height={60} width={60} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOffersListView()
      case apiStatusConstants.failure:
        return this.renderOffersFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default RestaurantCarousel
