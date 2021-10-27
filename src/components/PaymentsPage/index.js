import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const PaymentsPage = () => (
  <>
    <Header />
    <div className="payments-page-container">
      <img src="/img/CheckCircle.png" alt="tick" className="tick-mark" />
      <h1 className="payments-heading">Payment Successful</h1>
      <p className="payments-desc">
        Thank you for ordering <br /> Your payment is successfully completed.
      </p>

      <Link to="/">
        <button type="button" className="back-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  </>
)

export default PaymentsPage
