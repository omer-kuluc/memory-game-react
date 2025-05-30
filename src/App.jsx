import { useState, useEffect } from "react";

let datas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

function App() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [matchedButtons, setMatchedButtons] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState(() => shuffleCards(datas));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  useEffect(() => {
    if (!gameOver) {
      const timerId = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [gameOver]);

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
    setIsGameOverModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsGameOverModalOpen(false);
  }

  function handleMoves() {
    setMoves(m => m + 1);
  }

  function endGame() {
    setGameOver(true);
    setTimeout(() => {
      setIsGameOverModalOpen(true);
    }, 500); // ✅ kısa gecikme
  }

  function handleClick(id) {
    if (selectedButtons.includes(id) || matchedButtons.includes(id)) return;

    const newSelectedButtons = [...selectedButtons, id];
    setSelectedButtons(newSelectedButtons);

    if (newSelectedButtons.length === 2) {
      handleMoves();

      const [firstId, secondId] = newSelectedButtons;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard.value === secondCard.value) {
        setMatchedButtons(prev => {
          const updated = [...prev, firstId, secondId];
          if (updated.length === cards.length) {
            endGame();
          }
          return updated;
        });
      }

      setTimeout(() => {
        setSelectedButtons([]);
      }, 1000);
    }
  }

  function convertSecondsToTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = secs.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="container">
      <Header onRestartClick={handleRestart} onOpenModal={handleOpenModal} />
      <MemoryArea
        cards={cards}
        selectedButtons={selectedButtons}
        handleClick={handleClick}
        matchedButtons={matchedButtons}
      />
      <Footer time={convertSecondsToTime(time)} moves={moves} gameOver={gameOver} />
      {isModalOpen && (
        <ModalPage onCloseModal={handleCloseModal} onRestartClick={handleRestart} />
      )}
      {isGameOverModalOpen && (
        <GameOverModal
          onRestartClick={handleRestart}
          onCloseModal={handleCloseModal}
          time={convertSecondsToTime(time)} // ✅ süre gösterilecek
          moves={moves} // ✅ hamle sayısı
        />
      )}
    </div>
  );
}

function Header({ onOpenModal, onRestartClick }) {
  return (
    <div className="header-section">
      <p className="header-memory">memory</p>
      <div className="header-right-section">
        <button onClick={onRestartClick} className="restart-button mobile-none">Restart</button>
        <button onClick={onRestartClick} className="new-game-button mobile-none">New Game</button>
      </div>
      <button onClick={onOpenModal} className="mobile-menu-button mobile-only">Menu</button>
    </div>
  );
}

function MemoryArea({ selectedButtons, handleClick, matchedButtons, cards }) {
  return (
    <div className="game">
      {cards.map((card) => {
        const isSelected = selectedButtons.includes(card.id);
        const isMatch = matchedButtons.includes(card.id);

        return (
          <button
            key={card.id}
            className={`game-item ${isMatch ? 'game-item-same' : isSelected ? 'game-item-active' : ''}`}
            onClick={isMatch ? null : () => handleClick(card.id)}
          >
            {card.value}
          </button>
        );
      })}
    </div>
  );
}

function Footer({ time, moves, gameOver }) {
  return (
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
  );
}

function ModalPage({ onCloseModal, onRestartClick }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-restart-btn" onClick={onRestartClick}>Restart</button>
        <button onClick={onRestartClick}>New Game</button>
        <button onClick={onCloseModal}>Resume Game</button>
      </div>
    </div>
  );
}

function GameOverModal({ onRestartClick, onCloseModal, time, moves }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>You did it!</h2>
        <p className="game-over-text">Game over! Here’s how you got on…</p>
        <div className="time-info">
          <p>⏱ Time Elapsed</p>
          <span><strong>{time}</strong></span>
        </div>
        <div className="move-info">
          <p>🎯 Moves Taken</p>
          <span><strong>{moves} Moves</strong></span>
        </div>
        <button
          className="modal-restart-btn"
          onClick={() => {
            onRestartClick();
            onCloseModal();
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;
