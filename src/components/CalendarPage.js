import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment)

const CalendarPage = ({trainings}) => {

   
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
            
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView='week'
            />
           
 
    );
};

export default CalendarPage;