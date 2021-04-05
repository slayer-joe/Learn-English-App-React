import React from 'react'
import MainImage from '../image/Main.jpg'

const Main =  () => {

    return (
        <div className="main-container">
            <div className="main-window">
            <h1 className="main-title">Добропожаловать в  the English Learning application</h1>
            <img src={MainImage}/>
            <p className="main-description">
                <span>Мы делаем изучение иностранного языка увлекательным и интересным, предлагая практический английский.</span><br/>
                Если вы зашли в приложение впервый раз, то перейдите во вкладку Library, и введите интересующие вас слова.
                Если же у вы уже посещали нас, то можете повторить материал во вкладке Learn, либо потренироваться в одном из режимов вовкладке Training.
                Приятного вам обучения!!
            </p>
            </div>
            
        </div> 
    )


}

export default Main