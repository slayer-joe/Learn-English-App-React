import React, {useState, useEffect} from 'react'


const Learn = ( {setScore, score, checkLevel} ) => {

    const library = JSON.parse(localStorage.getItem('library')) || [{id: 0, word: '', translate: '', learn: 0, correct: 0, error: 0}]
   
    const [index, setIndex] = useState(0);
    const [end, setEnd] = useState(true);
    const word = library[index];


    const nextWord = () => {
        if(library.length - 1 !== index) {
            setIndex(index + 1);
            setScore(score + 0.5);
            word.learn += 1
            localStorage.setItem('library', JSON.stringify(library))
            checkLevel();
        } else {
            setEnd(false)
        }
        
    }

    const repeat = () => {
        setIndex(0);
        setEnd(true);
    }

    useEffect(() => {
        return () => {
            localStorage.setItem('score', score)
        }
    }, [])
    return (
        <div>
        {JSON.parse(localStorage.getItem('library')).length > 1 ? <div className="learn-wrapper">
            <div className="learn-container">
                {end ? <div className="percentage">{Math.floor(Math.abs(word.learn + word.correct - word.error) * 10)}%</div> : null}
                
                <div className="word-translation">{end ? word.translate : 'Well done!'}</div>

                {end ?  <div className="word-container">
                    <span className="description-label">Translation</span>

                    <span className="word">{word.word}</span>
                </div> : null}   
            </div>
            
            {end ? <button onClick={nextWord} className="btn-next">&#10230;</button> : <button onClick ={repeat} className="btn-next">&#8635;</button>}
        </div> : <h1 className="error-message">NOT ENOUGH WORDS</h1> }
        </div>
    )
}

export default Learn