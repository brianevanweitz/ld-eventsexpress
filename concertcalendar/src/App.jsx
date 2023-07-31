import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import EventList from './components/EventList';
import AllEvents from './components/AllEvents';
import { format } from 'date-fns';
import { getConcerts } from './services/api';
import Calendar from './components/Calendar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        city: ''
      },
      eventData: [],
      savedEvents: [],
      selectedDate: new Date()
    }
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day
    }, () => {
      this.submitDay();
    });
  }

  submitDay = async () => {
    const city = this.state.formData.city;
    const date = format(this.state.selectedDate, "YYYY-MM-DD")
    const modal = document.querySelector('#event-list')
    const eventData = await getConcerts(date, city);
    if (eventData) {
      this.setState({
        eventData: eventData.events
      })
    } else {
      this.setState({
        eventData: null
      })
    }
    modal.style.display = "block";
  };

  saveEvent = (id, name, date) => {
    if (this.state.savedEvents.length !== 0) {
      if (!this.state.savedEvents.some(e => e.id === id)) {
        this.setState(prevState => ({
          savedEvents: [...prevState.savedEvents, {
            id: id,
            name: name,
            date: date
          }]
        }))
      }
    } else {
      this.setState(prevState => ({
        savedEvents: [...prevState.savedEvents, {
          id: id,
          name: name,
          date: date
        }]
      }))
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }))
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.history.push("/calendar")
  }
  closeModal = () => {
    const modal = document.querySelector('#event-list');
    modal.style.display = 'none';
  }
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <Home
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          formData={this.state.formData}
          resetForm={this.resetForm} />} />
        <Route path="/calendar" render={() =>
          <Calendar
            onDateClick={this.onDateClick}
            savedEvents={this.state.savedEvents} />} />
        <Route path="/calendar" render={() =>
          <EventList
            eventData={this.state.eventData}
            saveEvent={this.saveEvent}
            handleSubmit={this.handleSubmit}
            closeModal={this.closeModal} />} />
        <Route path="/allevents" render={() =>
          <AllEvents
            savedEvents={this.state.savedEvents} />} />

      </div>
    );
  }
}

export default withRouter(App);
