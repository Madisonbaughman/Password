export default function WordGraveyard({ guesses }) {
    return (
      <div className="graveyard">
        <h3>Chosen Letters</h3>
        <div className='makeRow'>
          {guesses.old.map((n) => (
            
            <li className='graveyardLetters' key={n}>{n}</li>
            
          ))}
        </div>
      </div>
    );
  }
  