import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img src="/img/NotFound.png" alt="not found" className="not-found-img" />
      <h1 className="notFound-heading">Page Not Found</h1>
      <p className="notFound-desc">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button type="button" className="back-btn">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
