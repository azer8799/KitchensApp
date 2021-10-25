import Cookies from 'js-cookie'
import {Component} from 'react'
// import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsFilterLeft,
} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import './index.css'
import RestaurantItem from '../RestaurantItem'

const sortByOptions = [
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class RestaurantsList extends Component {
  state = {
    apiStatus: apiConstants.initial,
    restaurantData: [],
    activePage: 1,
    activeSortOption: sortByOptions[1].value,
    searchInput: '',
  }

  componentDidMount() {
    this.getApiRequest()
  }

  getFormattedData = data => ({
    hasOnlineDelivery: data.has_online_delivery,
    hasTableBooking: data.has_table_booking,
    id: data.id,
    isDeliveringNow: data.is_delivering_now,
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    menuType: data.menu_type,
    groupByTime: data.group_by_time,
    opensAt: data.opens_at,
    location: data.location,
    imageUrl: data.image_url,
    name: data.name,
    rating: data.user_rating.rating,
  })

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getApiRequest()
    }
  }

  getApiRequest = async () => {
    const {searchInput, activeSortOption} = this.state
    this.setState({apiStatus: apiConstants.loading})
    const {activePage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${activeSortOption}`
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.restaurants.map(eachItem =>
        this.getFormattedData(eachItem),
      )

      this.setState({
        restaurantData: updatedData,

        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#f7931e" height={60} width={60} />
    </div>
  )

  forwardButton = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getApiRequest,
      )
    }
  }

  backButton = () => {
    const {activePage} = this.state

    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getApiRequest,
      )
    }
  }

  changeOption = event => {
    this.setState({activeSortOption: event.target.value}, this.getApiRequest)
  }

  renderFailureView = () => (
    <div className="no-results-view">
      <img
        src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300"
        className="no-results-img"
        alt="no restaurants"
      />
    </div>
  )

  renderRestaurantDetailsView = () => {
    const {restaurantData} = this.state

    // const shouldShowProductsList = restaurantData.length > 0
    console.log(restaurantData.length)

    return (
      <div className="container">
        <ul className="all-restaurants" testid="restaurant-item">
          {restaurantData.map(eachItem => (
            <RestaurantItem restDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderRestaurantDetailsView()
      case apiConstants.loading:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {activePage, searchInput, activeSortOption} = this.state
    // console.log(activeSortOption)
    return (
      <>
        <div className="restaurantList-details-container">
          <div className="-item">
            <div className="filter-container">
              <h1 className="popular-heading">Popular Restaurants</h1>

              <div className="row-align">
                <p className="popular-desc">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
                <div className="filter-icon-container">
                  <BsFilterLeft fontSize="25px" className="filter-icon" />
                  <p className="option-desc">Sort By</p>

                  <select
                    className="sort-by-select"
                    onChange={this.changeOption}
                    value={activeSortOption}
                  >
                    {sortByOptions.map(eachOption => (
                      <option key={eachOption.id} value={eachOption.value}>
                        {eachOption.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="restaurant-input-container">
                <input
                  type="search"
                  onChange={this.changeSearchInput}
                  value={searchInput}
                  onKeyDown={this.onEnterSearchInput}
                  className="searching-input"
                  placeholder="Restaurant name"
                />
                <AiOutlineSearch
                  className="search-icon"
                  onClick={this.getApiRequest}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="product-item-details-container">
          {this.renderAllList()}
          <div className="restaurantList-button-container">
            <button
              onClick={this.backButton}
              type="button"
              className="arrow-button"
              testid="pagination-left-button"
            >
              <BsArrowLeftCircle color="green" />
            </button>
            <span className="desc" testid="active-page-number">
              {activePage}
            </span>
            <button
              onClick={this.forwardButton}
              type="button"
              className="arrow-button"
              testid="pagination-right-button"
            >
              <BsArrowRightCircle color="green" />
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default RestaurantsList
