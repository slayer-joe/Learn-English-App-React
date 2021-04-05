import React, { useState } from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import CheckMode from './CheckMode'
import WriteMode from './WriteMode'

export default (props) => {

    const location = useLocation();
    const [correctAnswer, setAnswer] = useState(0)
    const [wrongAnswer, setWrongAnswer] = useState(0)

   
    return (

        <div className="game-wrapper">
            <div className="component-header">
                <NavLink to='/training'>
                    <button className="exit-btn">EXIT</button>
                </NavLink>
            
                    <div className="answer correct">Correct: {correctAnswer}</div>
                    <div className="answer error">Error: {wrongAnswer}</div>
                
            </div>
            <div className="component-main"></div>
            {location.pathname === '/training/check-word-mode' ? 
                    <CheckMode setScore={props.setScore}
                                score={props.score}
                                correctAnswer={correctAnswer}
                                wrongAnswer={wrongAnswer}
                                setAnswer={setAnswer}
                                setWrongAnswer={setWrongAnswer}
                                checkLevel={props.checkLevel}/> : 
            location.pathname === '/training/write-word-mode' ? 
                        <WriteMode setScore={props.setScore}
                                    score={props.score}
                                    correctAnswer={correctAnswer}
                                    wrongAnswer={wrongAnswer}
                                    setAnswer={setAnswer}
                                    setWrongAnswer={setWrongAnswer}
                                    checkLevel={props.checkLevel}/> 
            : null}
          
            
        </div>
       
    )

 }

