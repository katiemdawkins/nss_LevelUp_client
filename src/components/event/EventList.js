import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { deleteEvent, getEvents, leaveEvent, joinEvent } from "./EventManage.js"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    const eventsState = () => {
        getEvents()
        .then((data) => {
            setEvents(data)
        })
    }

    useEffect(()=>{
        eventsState()
    }, [])

    const onDeleteEventClick = (eventId) => {
        return deleteEvent(eventId)
        .then((data) =>{
            eventsState(data)
        })
    }
    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__name">Game: {event.game.title}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__when">When? {event.date}, {event.time}</div>
                        {
                            event.joined ?
                            <button onClick={()=>{leaveEvent(event.id).then(res=>setEvents(res))}}>Leave Event</button>
                            :
                            <button onClick={()=>{joinEvent(event.id).then(res=>setEvents(res))}}>Join Event</button>
                        }
                        <button onClick ={()=>{
                            history.push(`events/edit/${event.id}`)
                        }}>Edit Event</button>
                        <button onClick={()=>{onDeleteEventClick(event.id)}}>Delete Event</button>
                    </section>
                })
            }
        </article>
    )
}