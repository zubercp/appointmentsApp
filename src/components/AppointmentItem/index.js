import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentList} = props
  const {title, date, isStarred, id} = appointmentList

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarIconClicked = () => {
    const {onToggleStar} = props
    onToggleStar(id)
  }

  return (
    <li className="appointment-item">
      <div>
        <h1 className="appointment-title">{title}</h1>
        <p className="appointment-time">
          {format(new Date(date), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
      <div>
        <button
          type="button"
          className="star-btn"
          data-testid="star"
          onClick={onStarIconClicked}
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
