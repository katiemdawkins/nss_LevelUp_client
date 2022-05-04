import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { updateGame, getGameTypes, getGameById } from './GameManager.js'

export const EditGame = () => {
    const [game, setGame] = useState({})
    const [gameTypes, setGameTypes] = useState([])

    const {gameId}= useParams()
    const history = useHistory()

    useEffect(()=>{
        getGameById(gameId)
        .then(data => setGame(data))
    },[gameId])

    useEffect(()=>{
        getGameTypes()
        .then(data =>setGameTypes(data))
    },[])

    const editCurrentGame =(evt) =>{
        evt.preventDefault()
        
        const editGameObj = {
    
            maker: game.maker,
            title: game.title,
            number_of_players: parseInt(game.number_of_players),
            skill_level: parseInt(game.skill_level),
            game_type: parseInt(game.gameTypeId)
        }
        updateGame(editGameObj).then(()=> history.push("/"))

    }

    const updateGameState = (evt)=> {
        const gameCopy = {...game}
        gameCopy[evt.target.name] = evt.target.value
        setGame(gameCopy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameType">Game Type: </label>
                    <div className="control">
                        <select name="gameTypeId"
                            proptype="int"
                            value={game.gameTypeId}
                            onChange={updateGameState}>
                            <option value={game.gameTypeId}>Select Game Type</option>
                            {gameTypes.map(gtype => (
                                <option key = {gtype.id} value={gtype.id}>
                                    {gtype.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={updateGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={updateGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number Of Players: </label>
                    <input id ="numOfPlayers" type="number" name="number_of_players" required autoFocus className="form-control"
                        value={game.number_of_players}
                        onChange={updateGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={game.skill_level}
                        onChange={updateGameState}
                    />
                </div>
            </fieldset>
            <button onClick={editCurrentGame}>Submit</button>
        </form>
    )
}