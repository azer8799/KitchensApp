import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FoodItem from '../FoodItem'

import './index.css'
import Footer from '../Footer'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    productData: {},
    foodItemsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    rating: data.rating,
    name: data.name,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    imageUrl: data.image_url,
    reviewsCount: data.reviews_count,
    opensAt: data.opens_at,
    location: data.location,
    itemsCount: data.items_count,
  })

  getFormattedFoodItem = data => ({
    name: data.name,
    cost: data.cost,
    foodType: data.food_type,
    imageUrl: data.image_url,
    id: data.id,
    rating: data.rating,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    console.log(match)
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedFoodItemsData = fetchedData.food_items.map(eachProduct =>
        this.getFormattedFoodItem(eachProduct),
      )
      this.setState({
        productData: updatedData,
        foodItemsData: updatedFoodItemsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#ffa412" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderProductDetailsView = () => {
    const {productData, foodItemsData} = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,
      //   opensAt,
      location,
      //   itemsCount,
    } = productData

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt="restaurant" className="banner-food-image" />
          <div className="restaurant-details">
            <h1 className="restaurant-name">{name}</h1>

            <p className="restaurant-subDesc">{cuisine}</p>
            <p className="restaurant-subDesc">{location}</p>
            <div className="rating-cost-container">
              <div className="label-value-container">
                <div className="rating-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="star"
                  />
                  <p className="restaurant-subDesc">{rating}</p>
                </div>
                <p className="restaurant-subDesc">{reviewsCount}+ Ratings</p>
              </div>
              <div className="rating-and-reviews-count">
                <p className="restaurant-subDesc">{costForTwo} </p>
                <p className="restaurant-subDesc">Cost for two</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="foodItem-list">
          {foodItemsData.map(eachSimilarProduct => (
            <FoodItem
              jobDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
