import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import Nav from './Components/Nav/Nav'
import Score from './Components/Score'
import Library from './Components/Library'
import Training from './Components/Training'
import Learn from './Components/Learn'
import Game from './Components/Games/Game'
import Main from './Components/Main'
import {Context} from './context'

function App() {
     
  const countLevel = () => {
        return Math.floor(((0.5 + Math.sqrt(1 + 8*(score) / (5))) / 2)) - 1
  }    

  const [score, setScore] = useState(JSON.parse(localStorage.getItem('score')) || 0);
  const [level, setLevel] = useState(0)

  const checkLevel = () => {
        
        setLevel(countLevel())
  }
  useEffect(() => {
     localStorage.getItem('library') ? localStorage.getItem('library') : localStorage.setItem('library', JSON.stringify([])) 
  }, [])

  return (
    <BrowserRouter>
      <Context.Provider value={{score, setScore}}>
      <div className="app-wrapper">
       <Nav level={level}/>
       <Score score={score}/>
          <Route path='//' component={Main}/>
          <Route path='/library' component={Library}/>
          <Route path='/training' component={Training}/>
          <Route path='/learn'>
                  <Learn checkLevel ={checkLevel}
                         score={score}
                         setScore={setScore}/>      
          </Route>
          <Route path='/training/check-word-mode'>
                <Game 
                      checkLevel ={checkLevel}/>
          </Route>
          <Route path='/training/write-word-mode'>
                <Game 
                      checkLevel ={checkLevel}/>
          </Route>
       
    </div>
      </Context.Provider>
    
    
    </BrowserRouter>
  );
}

export default App;
