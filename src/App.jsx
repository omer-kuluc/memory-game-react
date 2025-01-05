import { useState } from "react";


let datas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
let timerId;
let firstTime = false;

function App() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [matchedButtons, setMatchedButtons] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState(()=> shuffleCards(datas));
  const [isModalOpen, setIsModalOpen] = useState(false);

  function shuffleCards(datas) {
    const shuffled = datas.concat(datas).sort(() => Math.random() - 0.5);
    return shuffled.map(value => ({
      id: crypto.randomUUID(),
      value
    }));
  }

  function handleRestart() {
    setCards(shuffleCards(datas));
    setSelectedButtons([]);
    setMatchedButtons([]);
    setMoves(0);
    setTime(0);
    setGameOver(false);
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function timer() {
    timerId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000)
  }

  if (!firstTime) {
    timer();
    firstTime = true;
  }

  function handleMoves() {
    setMoves(moves + 1);
  }

  function endGame() {
    setGameOver(true);
    clearInterval(timerId);
  }
  
  function handleClick(id) {
    let newSelectedButtons = [];
    if (selectedButtons.includes(id)) {
      newSelectedButtons = selectedButtons.filter(x => x !== id);

    } else {
      if (selectedButtons.length >= 2) {
        newSelectedButtons[id];

      } else {
        newSelectedButtons = [...selectedButtons, id];
        if(newSelectedButtons.length === 2) {
          handleMoves();
          setTimeout(() => {
            setSelectedButtons([]); // Kartları kapat
          }, 1250); // 1 san
        }
      }
    }
    setSelectedButtons(newSelectedButtons);
    if(newSelectedButtons.length === 2 && 
      cards.find(x => x.id === newSelectedButtons[0])?.value ===
      cards.find(x => x.id === newSelectedButtons[1])?.value)
      {
        setMatchedButtons(prev => {
          const updateMatchButtons = [...prev, ...newSelectedButtons];
          if(updateMatchButtons.length === cards.length) {
            endGame();
          }
          return updateMatchButtons;
        });
      } 
  }

  function convertSecondsToTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60); // * minutes değişkenini zamanın dakikasını alıyoruz
    const secs = seconds % 60; // * secs değişkenini zamanın saniyesini alıyoruz

    const formattedMinutes = minutes.toString().padStart(2, "0"); // * minutes değişkenini 2 haneli stringe dönüştürüyoruz ve eğer 2 haneli değilse 0 ekliyoruz
    const formattedSeconds = secs.toString().padStart(2, "0"); // * secs değişkenini 2 haneli stringe dönüştü
    return `${formattedMinutes}:${formattedSeconds}`;
  }


  return (
    <div className="container">
      <Header onRestartClick = {handleRestart} onOpenModal = {handleOpenModal} />
      <MemoryArea cards = {cards}  selectedButtons={selectedButtons} handleClick = {handleClick} 
      matchedButtons = {matchedButtons} handleMoves = {handleMoves} endGame = {endGame}/>
      <Footer time = {convertSecondsToTime(time)} moves={moves} gameOver={gameOver} />
      {isModalOpen && <ModalPage onCloseModal = {handleCloseModal} onRestartClick = {handleRestart}/>}
      
    </div>
  );
}

function Header({onOpenModal, onRestartClick}) {
  return(
  <div className="header-section">
    <p className="header-memory">memory</p>
    <div className="header-right-section">
      <button onClick={onRestartClick} className="restart-button mobile-none">Restart</button>
      <button onClick={onRestartClick} className="new-game-button mobile-none">New Game</button>
    </div>
    <button onClick={onOpenModal} className="mobile-menu-button mobile-only">Menu</button>
  </div>
  )
}



function MemoryArea({selectedButtons, handleClick, matchedButtons, cards}) {
  return (
    <div className="game">
      {cards.map((card) => {
        const isSelected = selectedButtons.includes(card.id)
        const isMatch = matchedButtons.includes(card.id) 
        
        return (
        <button
          key={card.id}
          className={`game-item ${isMatch ? 'game-item-same' :  isSelected ? 'game-item-active' : '' }`}
          onClick={isMatch ? null : () => handleClick(card.id)}
          >
          {card.value}  
        </button>
        )
      })}
    </div>
  );
}

function Footer({time, moves, gameOver}) {
  return (
    <>
      <div className="footer">
        <h1>{gameOver && 'game over'}</h1>
        <div className="footer-context">
          <div className="time">
            <h2>Time</h2>
            <p>{time}</p>
          </div>
          <div className="moves">
           <h2>Moves</h2>
           <p>{moves}</p>
          </div>
        </div>
      </div>
    </>
  )
}

function ModalPage ({onCloseModal, onRestartClick}) {
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={onRestartClick}>Restart</button>
          <button onClick={onRestartClick}>New Game</button>
          <button onClick={onCloseModal}>Resume Game</button>
        </div>
      </div>
    
    </>

  )
}

export default App;
