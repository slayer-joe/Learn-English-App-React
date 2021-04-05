import React from 'react'
import {NavLink} from 'react-router-dom'

const Mode = (props) =>{

    return (
        <NavLink to={`/training${props.path}`}>
        <div className={'mode '+ props.modeDif}>
            <div className="game-name">
                <h2>{props.name}</h2>
                <p>{props.difficuilt}</p>
            </div>
            <div className="image">
                <img src={props.image}/>
            </div>
        </div>
        </NavLink>
        
    )

 }

 export default Mode