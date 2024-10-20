import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  state = {apiStatus: '', searchInput: ''}

  render() {
    const {apiStatus, searchInput} = this.state
    console.log(apiStatus, searchInput)
    return (
      <>
        <Header />
        <div className="jobs-section">
          <div className="filter-container">
            <h1>Filter</h1>
          </div>
          <div className="jobs-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
              />
              <FaSearch className="search-icon" />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
