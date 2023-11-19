import '../assets/styles.css'
import {useState} from 'react';

const Solve = ({chosenWordCap, def, setDefToggle}) => {

    let [attempt, setAttempt] = useState('');
    let [firstAttempt, setFirstAttempt] = useState(true)

    const handleInput = (e) => {
        let oneGuess = e.target.value.toUpperCase()
        setAttempt(oneGuess)
    }

    const runAttempt= () => {
        if (firstAttempt){
            setFirstAttempt(false)
        console.log('attempt: ' + attempt)
        console.log('chosenWordCap ' + chosenWordCap)
        if (attempt === chosenWordCap){
            console.log("you win " + def.definition)
            // toggle defToggle
            setDefToggle(true)
            setAttempt('')
        } else {
            alert('You didnt solve it; you lost. Game over')
        }
    } 
        if (!firstAttempt){
            alert('no more attempts!')
        }
    }

    return(
    <div className='solveBox'>
        <input style={{borderColor: 'black'}} placeholder='1 Guess Only...' onChange={handleInput} value={attempt}/>
        <button onClick={runAttempt} disabled={!firstAttempt}> Solved it!</button>
    </div>
    )

} 

export default Solve;