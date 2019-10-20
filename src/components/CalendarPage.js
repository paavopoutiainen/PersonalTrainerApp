import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

const CalendarPage = ({trainings}) => {

   //start, end ja title
    console.log("trainings in calendar",  trainings)
    
    /*let events= [
        {
          start: new Date(),
          end: new Date(moment().add(1, "days")),
          title: "Some title"
        }
      ]*/
     
    let events = trainings.map(t => {
        let date = new Date(t.date)
        
        let events = {
            start: date,
            end: new Date(moment(date).add(t.duration, "minutes")),
            title: t.activity
        }

        return events
    })  


    return (
        <div>
            <h1>calendar </h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
            />
           
        </div>
    );
};

export default CalendarPage;