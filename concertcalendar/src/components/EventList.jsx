import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }
  handleClick = (e) => {
    let currentTargetId = e.currentTarget.id
    this.setState(prevState => ({
      selected: [...prevState.selected, currentTargetId]
    }))
  }
  render() {
    return (
      <div id='event-list'>
        <main id='list-main'>
          <div id='return'>
            <button onClick={this.props.closeModal}>x</button>
          </div>
          <div id='list-grid'>
            {this.props.eventData ?
              this.props.eventData.map((event) => (
                <div id={event.id} className={this.state.selected.includes(event.id) ? "event-selected" : "event"} key={event.id} onClick={(e) => {
                  this.handleClick(e);
                  this.props.saveEvent(event.id, event.name, format(event.dates.start.dateTime, 'YYYY-MM-DD'))
                }}>
                  <h3>{event.name}</h3>
                  <p>Location: {event._embedded.venues[0].name}</p>
                  <p>Start time: {format(event.dates.start.dateTime, 'h:mm A')}</p>
                  <p className='add-event'>{this.state.selected.includes(event.id) ? "Event Added" : "Add to calendar"}</p>

                </div>
              )) : <div id="sorry"><h3>No events available in your area on that date, sorry!</h3></div>}
          </div>
        </main>


      </div>
    )
  }
}

export default EventList;