// Write your code here
import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

const RestaurantItem = props => {
  const {restDetails} = props
  const {
    // hasOnlineDelivery,
    // hasTableBooking,
    id,
    // isDeliveringNow,
    // costForTwo,
    cuisine,
    // menuType,
    // groupByTime,
    // opensAt,
    // location,
    imageUrl,
    name,
    rating,
  } = restDetails
  return (
    <Link to={`/restaurant/${id}`} className="link-container">
      <li className="restaurant-item" testid="restaurant-item">
        <div className="card-image-container">
          <img src={imageUrl} alt="restaurant" className="thumbnail-img" />
          <div className="card-content-align">
            <h1 className="restaurant-item-title">{name}</h1>
            <p className="restaurant-item-cuisine"> {cuisine}</p>
            <div className="restaurant-item-star-align">
              <AiFillStar fill="#FFCC00" className="star-icon" />
              <p className="restaurant-item-rating">{rating}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
