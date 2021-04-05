import React, { useEffect, useState, useContext } from 'react'
import {Context} from '../../context'

export default (props) =>{
    const context = useContext(Context)
    const checkWord = word => {

        if(word === library[currentWordIndex].word) {

            props.setAnswer(props.correctAnswer + 1)
            props.checkLevel();
            if(currentWordIndex < library.length -1) {
                setCurrentWordIndex(currentWordIndex + 1)
                context.setScore(context.score + 1)
                library[currentWordIndex].correct = library[currentWordIndex].correct + 1;
                localStorage.setItem('library', JSON.stringify(library))
                localStorage.setItem('score', JSON.stringify(context.score))
            } else {
                setCurrentWordIndex(0)
                alert('Game Over')
            }
            
        } else {
            props.setWrongAnswer(props.wrongAnswer + 1)
            library[currentWordIndex].error = library[currentWordIndex].error + 1;
            localStorage.setItem('library', JSON.stringify(library))

        }

        
    }

    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [library, setLibrary] = useState(
        JSON.parse(localStorage.getItem('library')).sort(()=>Math.random() - 0.5).length == 0 ? [{id: 0, word: '', translate: ''}] : JSON.parse(localStorage.getItem('library')).sort(()=>Math.random() - 0.5)
        )
    const [checkArr, setCheckArr] = useState([])
    const currentWord = library[currentWordIndex].translate
    const [initialScore, setInitialScore] = useState(props.score)

    useEffect(()=>{
        const filterArr = library.filter((item, index) => index !== currentWordIndex)
        filterArr.sort(()=> Math.random - 0.5) 
        const checkArr = filterArr.length >= 2 ? [filterArr[0].word, filterArr[1].word, library[currentWordIndex].word] : ['', '', '']
        setCheckArr(checkArr.sort(()=> Math.random() - 0.5))
    }, [props.correctAnswer])

    useEffect(() => {
        return () => {
            localStorage.setItem('score', context.score)
        }
    })

    useEffect(() => {
        localStorage.setItem('score', JSON.stringify(props.score))
    }, [props.score])

    return (
        <div>
        {library.length >= 3 ? <div className ="page-wrapper">
            <div className="mode-title-word">{currentWord}</div>
            <div className="mode-title-description">Set translation for this word</div>
            <div className="check-block">
                {checkArr.map((item, index) => {
                    return <div key={index} className="check-item" onClick={()=>checkWord(item)}>{item}</div>
                })}
            </div>
        </div>: <h1 className="error-message">NOT ENOUGH WORDS</h1>} 
        </div>
        
    )

 }
