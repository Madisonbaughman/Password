import { useState } from "react";
import "../assets/styles.css";
import DisplayWord from "./DisplayWord.jsx";
import { wordsArray } from "../assets/wordsArray.js";

function StartButton() {
  let [startToggle, setStartToggle] = useState(false)
  let [chosenWord, setWord] = useState(null);
  let [def, setDefinition] = useState({definition: ''})
  let [guesses, setGuesses] = useState({ current: "", old: [] });

  console.log(import.meta.env.VITE_API_KEY)

  function selectWord() {
    let selectIndex = Math.floor(Math.random() * wordsArray.length);
    let selectedWord = wordsArray[selectIndex];
    return selectedWord;
  }

  const fetchWord = async() => {
    try{

      const respWord = await fetch(`https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun%2C%20adjective%2C%20verb%2C%20adverb&excludePartOfSpeech=noun-plural%2C%20noun-posessive%2C%20family-name%2C%20preposition%2C%20abbreviation%2C%20affix%2C%20idiom%2C%20proper-noun%2C%20phrasal-prefix%2C%20present-participle%2C%20past-participle&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${import.meta.env.VITE_API_KEY}`)
      
      if (!respWord.ok){
       return selectWord()
      }
      
      let data = await respWord.json()
      console.log(data)
      return data.word

    }catch{
      console.log('there was an error')
      return selectWord()
    } 
  }

  const definition = async (word) => {
    try{
        const resp = await fetch(`https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=${import.meta.env.VITE_API_KEY}`)
        
        if (!resp.ok){
          return 
        }
        
        let data = await resp.json()
        let wordDef = data[0].text
        console.log(wordDef)
        return wordDef
  
      }catch{
        console.log('there was an error')
        return 
      } 
}


  let handleClick = async () => {
    let displayWord = await fetchWord();
    let def = await definition(displayWord);
    if (!def) {
      displayWord = selectWord();
      def = await definition(displayWord)
      
    }
    setWord(displayWord);
    setDefinition({definition: def})
    setGuesses({ current: "", old: [] });
    setStartToggle(true)
  };

  return (
    <div className='fit'>
      <button style={{ margin: 20 }} onClick={handleClick} disabled={startToggle}>
        {" "}
        New Password{" "}
      </button>
      {chosenWord && (
        <>
          <DisplayWord
            chosenWord={chosenWord}
            def={def}
            guesses={guesses}
            setGuesses={setGuesses}
          />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <StartButton />
    </div>
  );
}
