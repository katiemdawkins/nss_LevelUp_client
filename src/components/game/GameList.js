import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { deleteEvent } from "../event/EventManage.js"
import { deleteGame, getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()

    const gamesState = () =>{
        getGames().then(data => setGames(data))
    }

    useEffect(()=>{
        gamesState()
    },[])

    const onDeleteClick = (gameId) =>{
        return deleteGame(gameId)
        .then(data => {
            gamesState(data)
        })
    }
    
    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button onClick={()=> {
                            history.push(`games/edit/${game.id}`)
                        }}>Edit Game</button>
                        <button onClick={()=>{onDeleteClick(game.id)}}>Delete Game</button>
                    </section>

                })
            }
        </article>
    )
}