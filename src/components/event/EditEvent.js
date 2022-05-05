import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGames } from "../game/GameManager"
import { getEventById, updateEvent } from "./EventManage"


export const EditEvent = () => {
    const [ event, setEvent ] = useState({})
    const [ games, setGames] = useState([])
    
    const {eventId} = useParams()
    const history = useHistory()

    useEffect (()=>{
        getEventById(eventId)
        .then(data => setEvent(data))
    }, [eventId])

    useEffect(()=>{
        getGames().then(data => setGames(data))
    },[])

    const editCurrentEvent = (evt) => {
        evt.preventDefault()

        const editEventObj = {
            id: event.id,
            description: event.description,
            date: event.date,
            time: event. time,
            game: parseInt(event.game),
            organizer: parseInt(localStorage.getItem("token"))
        }
        updateEvent(editEventObj). then(()=> history.push("/events"))
    }

    const updateEventState = (evt) =>{
        const eventCopy = {...event}
        eventCopy[evt.target.name] = evt.target.value
        setEvent(eventCopy)
    }

    return(
        <form>
            <h2>Create a New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <div className="control">
                        <select name="game"
                            proptype="int"
                            value={event.game}
                            onChange={updateEventState}>
                            <option value="0">Select your game...</option>
                            {games.map(game => (
                                <option key = {game.id} value={game.id}>
                                    {game.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description of your event: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={updateEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of your event: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={updateEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time of your event: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={event.time}
                        onChange={updateEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={editCurrentEvent}
                className="btn btn-primary">Create Event</button>
        </form>
    )
    
}