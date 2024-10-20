import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {id, name, imageUrl} = skillDetails
  return (
    <li className="skills-item-container">
      <div className="skills-container">
        <img src={imageUrl} alt={id} className="skill-image" />
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillItem
