import {Link} from 'react-router-dom'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails
  return (
    <Link className="job-item-link" to={`/jobs/${id}`}>
      <li className="list-item">
        <div className="logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="star-rating">
              <FaStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employment-salary-container">
          <div className="location-employment-container">
            <MdLocationOn className="icon" />
            <p className="location-details">{location}</p>
            <BsFillBriefcaseFill className="icon" />
            <p className="employemnet-type">{employmentType}</p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line" />
        <p className="description-heading">Description</p>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
