import React  from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../../image/logo.svg'

const LogoContainer = (props)=> {
    return (
       
        <div className="logo-container">
            <NavLink to="/">
                <img src={logo} className="main-logo"/>
            </NavLink>
               <span className="level-title">LEVEL {props.level}</span>
       </div>
    )
}   

export default LogoContainer