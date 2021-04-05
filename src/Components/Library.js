import React from 'react'
import del from '../image/del.svg'

class Library extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            isOpen: true,
            translation: '',
            library: JSON.parse(localStorage.getItem('library')),
            value: ''
        }

        this.wordRef = Array(this.state.library.length)

        this.changeMode = this.changeMode.bind(this)
        this.getValue = this.getValue.bind(this)
        this.addWordToLibrary = this.addWordToLibrary.bind(this)
        this.checkWord = this.checkWord.bind(this)

    }

    changeMode() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))

    }   

     async getValue(evt) {
        const value = evt.target.value

        this.setState(() => ({
            value: value
        }))

    }

    componentDidMount () {
        
        document.addEventListener('keyup', (evt)=>{
            if(evt.code == 'Enter' && this.state.value.length > 0) {
                this.addWordToLibrary()
            }
        })

    }
    async removeWordFromLibrary(index) {
     
         await this.setState((prevState)=>({
            library: prevState.library.filter((item, ind) =>{
                return ind != index;
            })
        }))
        await localStorage.setItem('library', JSON.stringify(this.state.library))
    }

    async addWordToLibrary() {

        try {
            const response = await fetch(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=en&target=ru&input=${this.state.value}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "85e1609e30msh1dbe4f7656f4474p10fa70jsndf8839013be7",
                    "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com"
                }
            })
            await this.setState(() => ({
                translation:''
            }))
            const answer = await response.json()
            if(answer.outputs) {
                await this.setState(() => ({
                    translation: answer.outputs[0].output
                }))
    
            }
            
            await this.setState((prevState)=>({
                library: [...prevState.library, {id: this.state.library.length, word: this.state.value, translate: this.state.translation, correct: 0, error: 0, learn: 0}]
            }))
            await localStorage.setItem('library', JSON.stringify(this.state.library))
            await this.changeMode();
           

        }
        catch(e) {
            console.log(e)
        }
    }

    checkWord() {
        let s = this.wordRef
        console.log(s)
    }

    render() {
        return (
            <div className="page-container">
                <div className="add-word-container">
                {this.state.isOpen ? <span className="label-title">Add new Word</span> : 
                <div>
                    <input onChange={this.getValue} type="text" placeholder="Enter new word"></input>
                    <span>{this.state.translation}</span>
                    <button onClick = {this.addWordToLibrary} className="btn-round check">✔</button>
                </div>
                }
                
                <button onClick = {this.changeMode} className={this.state.isOpen ? 'btn-round close' : 'btn-round add'}>+</button>
                </div>
                <div>
                    <div className="library-container">
                        <div className="library-header">
                                <div>Word</div>
                                <div>Translate</div>
                                <div>Learn level</div>
                        </div>
                        
                            {this.state.library.map((item, ind)=>{
                            return <div key = {ind}
                                        ref={el => this.wordRef[ind] = el}>
                                    <div>
                                        {item.word}
                                    </div>
                                    <div>
                                        {item.translate}
                                    </div>
                                    <div>
                                        {Math.floor(Math.abs(item.learn + item.correct - item.error) * 10)}%
                                    </div>
                                    <button onClick={()=>{this.removeWordFromLibrary(ind)}} className="delete">Delete<span><img src={del}/></span></button>
                                </div>
                            })}
                    </div>
               
                </div>
            </div> 
        )
    }
    }

export default Library