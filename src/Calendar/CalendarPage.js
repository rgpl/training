
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class CalendarPage extends Component {
  constructor() {
    super();
    const events = [
      {
        title: 'All Day Event',
        start: '2020-04-01'
      },
      {
        title: 'Long Event',
        start: '2020-04-07',
        end: '2020-04-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2020-04-09T16:00:00'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2020-04-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2020-04-11',
        end: '2020-04-13'
      },
      {
        title: 'Meeting',
        start: '2020-04-12T10:30:00',
        end: '2020-04-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2020-04-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2020-04-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2020-04-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2020-04-28'
      }
    ]
    this.state = {
      name: 'React',
      events
    };
  }

  render() {
    return (
      <div>
        <p>
          Unlock Calendar.
        </p>
        <div style={{ height: '500pt'}}>
          <Calendar
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
      </div>
    );
  }
}

render(<CalendarPage />, document.getElementById('root'));

export default CalendarPage;
