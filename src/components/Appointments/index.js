import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    starredFiltered: false,
    error1: false,
    error2: false,
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  ondateChange = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    if (title === '') {
      this.setState({error1: true})
      return
    }

    if (date === '') {
      this.setState({error2: true})
      return
    }

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
      error1: false,
      error2: false,
    }))
  }

  onToggleStar = appointmentId => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === appointmentId) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onClickFilterBtn = () => {
    this.setState(prevState => ({
      starredFiltered: !prevState.starredFiltered,
    }))
  }

  render() {
    const {
      title,
      date,
      appointmentList,
      starredFiltered,
      error1,
      error2,
    } = this.state
    const starredBtnClass = starredFiltered ? 'starred-active' : ''
    const errorDisplayClass = error1 ? '' : 'error-display'
    const errorDisplayClass2 = error2 ? '' : 'error-display'

    let filteredAppointmentList = appointmentList

    if (starredFiltered) {
      filteredAppointmentList = appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }

    return (
      <div className="container">
        <div className="card">
          <h1 className="heading">Add Appointment</h1>
          <div className="add-appointment-container">
            <form
              className="appointment-form-container"
              onSubmit={this.onAddAppointment}
            >
              <div className="input-group">
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  className="input"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.onTitleChange}
                />
                <p className={`error ${errorDisplayClass}`}>TITLE Required*</p>
              </div>
              <div className="input-group">
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  className="input"
                  id="date"
                  value={date}
                  onChange={this.ondateChange}
                />
                <p className={`error ${errorDisplayClass2}`}>DATE Required*</p>
              </div>
              <button type="submit" className="submit-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <div className="appoinments-heading-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-text ${starredBtnClass}`}
              onClick={this.onClickFilterBtn}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items-container">
            {filteredAppointmentList.map(eachItem => (
              <AppointmentItem
                appointmentList={eachItem}
                key={eachItem.id}
                onToggleStar={this.onToggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
