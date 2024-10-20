import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickedLogOutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header-container">
      <div className="Logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="logo"
            className="logo-in-header"
          />
        </Link>
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>
      <div className="logOut-button-container">
        <button
          type="button"
          className="logOut-btn"
          onClick={onClickedLogOutButton}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
