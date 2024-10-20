import ProfileCard from '../ProfileCard'
import './index.css'

const FilterGroup = () => {
  const renderTypeOfEmployment = () => {}
  const renderSalaryRange = () => {}

  return (
    <div className="filter-container">
      <ProfileCard />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroup
