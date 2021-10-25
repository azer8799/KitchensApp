import './index.css'

const CarouselItem = props => {
  const {carouselDetails} = props
  const {imageUrl} = carouselDetails

  return (
    <li className="item-container">
      <img src={imageUrl} alt="offer" className="carousel" />
    </li>
  )
}

export default CarouselItem
