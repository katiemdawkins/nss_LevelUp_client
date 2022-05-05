import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getEvents } from "./EventManage.js"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

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
                        <button onClick ={()=>{
                            history.push(`events/edit/${event.id}`)
                        }}>Edit Event</button>
                    </section>
                })
            }
        </article>
    )
}