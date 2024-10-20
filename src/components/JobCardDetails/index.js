import {Component} from 'react'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {BiLinkExternal} from 'react-icons/bi'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobCardDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobData: {},
    similarJobsData: [],
    skillsListData: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobDetailsApiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const jobDetails = fetchedData.job_details
      const updatedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
      }

      const similarJobs = fetchedData.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      const {skills} = jobDetails
      const skillsList = skills.map(each => ({
        id: each.name,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({
        jobData: updatedData,
        similarJobsData: similarJobs,
        skillsListData: skillsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLifeAtCompany = () => {
    const {jobData} = this.state
    const {lifeAtCompany} = jobData
    return (
      <div className="life-at-company-container">
        <p className="description card-description">
          {lifeAtCompany.description}
        </p>
        <img
          src={lifeAtCompany.image_url}
          alt="life at company"
          className="life-at-company-img"
        />
      </div>
    )
  }

  renderMainCard = () => {
    const {jobData} = this.state
    const {
      companyLogoUrl,
      title,
      location,
      rating,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobData
    const {skillsListData} = this.state
    return (
      <div className="Main-card">
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
        <div className="description-visit-container">
          <p className="description-heading">Description</p>
          <div className="visit-container">
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-heading"
            >
              Visit
            </a>
            <BiLinkExternal className="visit-icon" />
          </div>
        </div>
        <p className="description">{jobDescription}</p>
        <h1 className="description-heading">Skills</h1>
        <ul className="list-container">
          {skillsListData.map(eachSkill => (
            <SkillItem key={eachSkill.id} skillDetails={eachSkill} />
          ))}
        </ul>
        <h1 className="description-heading">Life at Company</h1>
        {this.renderLifeAtCompany()}
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobsData} = this.state
    return (
      <div className="sub-card">
        <h1 className="description-heading">Similar Jobs</h1>
        <ul className="list-container">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobCardDetailsView = () => (
    <div className="job-card-details-container">
      {this.renderMainCard()}
      {this.renderSimilarJobs()}
    </div>
  )

  renderFailureView = () => (
    <div className="job-item-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-img"
      />
      <h1 className="job-item-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-failure-description">
        We cannot seem to find the page you are looking for
      </p>

      <button
        type="button"
        id="button"
        className="job-item-failure-button"
        onClick={this.getJobData}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobCardDetailsView()
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
        {this.renderJobDetails()}
      </>
    )
  }
}

export default JobCardDetails
