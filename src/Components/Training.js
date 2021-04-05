import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import modeImage1 from './../image/mode-image1.png'
import modeImage2 from './../image/mode-image2.png'
import Mode from './Mode'


const Training = () => {

    
    return (
        
            <div className="training-wrapper">
                    <Mode name={'Check words mode'} 
                            difficuilt={'Easy mode'} 
                            image={modeImage1} 
                            modeDif={'easy'}
                            path={'/check-word-mode'}/>


                    <Mode name={'Write words mode'} 
                            difficuilt={'Hard mode'} 
                            image={modeImage2} 
                            modeDif={'hard'}
                            path={'/write-word-mode'}/>
            </div>

    )
}

export default Training