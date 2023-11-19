import { useState } from "react";
import WordGraveyard from "./WordGraveyard.jsx";
import Solve from "./Solve.jsx";
import Definition from './Definition.jsx';

export default function DisplayWord({ chosenWord, def, guesses, setGuesses }) {
  
  let [guessToggle, setGuessToggle] = useState(false);
  let [defToggle, setDefToggle] = useState(false);

  let chosenWordCap =  chosenWord.toUpperCase()
  
  let displayWordArr = chosenWordCap.split('')

  console.log('display Word Arr ' + displayWordArr)

  let reload = () => {window.location.reload()}

  function guess() {

    let handleGuess = (e) => {
      setGuessToggle(false);
      let newChoice = e.target.value.toUpperCase();
      if (newChoice.length > 1) {
        newChoice = newChoice[0];
      }
      if (guesses.old.includes(newChoice)) {
        
        alert("Already guessed");
        setGuessToggle(true);
      }
      setGuesses({ current: newChoice, old: [...guesses.old] });
    };

    let submittedGuess = (e) => {
      e.preventDefault();

      setGuesses({ current: "", old: [...guesses.old, guesses.current] });
      // check selected word for letter
      console.log(guesses.old);
      console.log(guesses.current);
    }

return (
      <form onSubmit={submittedGuess}>
        <label>
          {" "}
          Pick a letter: {""}
          <input
            style={{ width: 30, height: 30 }}
            type="text"
            placeholder="?"
            value={guesses.current}
            onChange={handleGuess}
          />
        </label>
        <br />
        <input type="submit" value="Submit" disabled={guessToggle} />
      </form>
    );
  }

  return (
    <>
      <div className='top'>
        {guess()}
        
        <WordGraveyard guesses={guesses} />

        <div className='boxesDiv'>
            {displayWordArr.map((letter, i) => (
            <div className="boxes" key={i}>

                {guesses.old.includes(letter) ?  <ul>{letter}</ul> :
                <ul style={{ display: "none" }}>{letter}</ul>}
            </div>
            ))}
        </div>

        <Solve chosenWordCap={chosenWordCap} def={def} setDefToggle={setDefToggle}/>
        {defToggle && <Definition def={def}/>}
        <button onClick={reload}>Reload Page Here To Start New Game</button>
      </div>
    </>
  );
}


