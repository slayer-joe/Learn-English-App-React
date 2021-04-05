import React, {useRef, useState, useContext, useEffect} from 'react'
import {Context} from '../../context';


export default (props) =>{

const context = useContext(Context)
const inpRef = useRef();


    const checkKeyPress = (evt) => {
        if(evt.key === 'Enter') {
            checkWord()
            console.log(library[currentWordIndex])
        }
    }

    const checkWord = () => {
        
        if(inpRef.current.value === library[currentWordIndex].word) {
            inpRef.current.value = ''
            props.setAnswer(props.correctAnswer + 1)
            props.checkLevel();
            if(currentWordIndex < library.length -1) {
                setCurrentWordIndex(currentWordIndex + 1)
                context.setScore(context.score + 1)
                localStorage.setItem('library', JSON.stringify(library))
               
            }else {
                setCurrentWordIndex(0)
                alert('Game Over')
            }
            
        } else {
            props.setWrongAnswer(props.wrongAnswer + 1)
            inpRef.current.value = ''
            localStorage.setItem('library', JSON.stringify(library))
        }

        
    }
    

    useEffect(() => {
        return () => {
            localStorage.setItem('score', context.score)
        }
    })

    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [library, setLibrary] = useState(
        JSON.parse(localStorage.getItem('library')).sort(()=>Math.random() - 0.5).length == 0 ? [{id: 0, word: '', translate: ''}] : JSON.parse(localStorage.getItem('library')).sort(()=>Math.random() - 0.5)
        )
    const currentWord = library[currentWordIndex].translate

    return (
        <div>
        {JSON.parse(localStorage.getItem('library')).length > 0 ? <div className ="page-wrapper">
            <div className="mode-title-word">{currentWord}</div>
            <div className="mode-title-description">Set translation for this word</div>
            <div className="write-block">
                    <input  onKeyPress={checkKeyPress} ref={inpRef} type="text" placeholder="Впишите перевод" className="input-field"></input>
                    <button className="input-button" onKeyDown ={checkWord} onClick={() => {checkWord(library[currentWordIndex])}}>Enter</button>
            </div>
        </div>  : <div className="error-message">NOT ENOUGH WORDS</div>}
    </div>
    )

 }

