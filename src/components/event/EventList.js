import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManage.js"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__name">Game: {event.game.title}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__when">When? {event.date}, {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}