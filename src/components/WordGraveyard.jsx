export default function WordGraveyard({ guesses }) {
    return (
      <div className="graveyard">
        <p>Chosen Letters</p>
        <div className='makeRow'>
          {guesses.old.map((n) => (
            
            <li className='graveyardLetters' key={n}>{n}</li>
            
          ))}
        </div>
      </div>
    );
  }
  