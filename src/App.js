import React, { Component } from 'react';
import './App.css';
import Keyboard from './Keyboard';
import PlayerInfo from './PlayerInfo';
import { hangmanImg } from './hangmanImg';

const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const words = ["ours", "miel", "ourson", "grotte", "foret", "paton", "arbre", "poisson", "fourrure"];

class App extends Component {
  state = {
    currentWord: this.generateWord(),
    triedKeys: [],
    maxPlayerNb: 2,
    currentPlayerIndex: 0,
    nbBadAnswer: 0,
    maxTryNumber: hangmanImg.length,
    players: [
      {
        id: 0,
        playerName: "Joueur 1",
        tryNumber: 0,
        score: 0
      }
    ]
  }

  generateWord() {
    return words[Math.floor(Math.random() * words.length)].toUpperCase().split("");
  }

  // Arrow fx for binding 'this'
  handleKeyboardClick = key => {
    const { currentWord, triedKeys, currentPlayerIndex, players, nbBadAnswer } = this.state;
    //ignore click on same key
    if (triedKeys.includes(key)) {
      return;
    }

    if (currentWord.includes(key)) {
      players[currentPlayerIndex].score = players[currentPlayerIndex].score + 2;
    } else {
      players[currentPlayerIndex].score = players[currentPlayerIndex].score - 1;
      this.setState({ nbBadAnswer: nbBadAnswer + 1 });
      this.changePlayer();
    }
    players[currentPlayerIndex].tryNumber = players[currentPlayerIndex].tryNumber + 1;
    this.setState({ triedKeys: triedKeys.concat(key) });
    this.setState({ players: players });
  }

  isLetterFound(letter) {
    if (this.state.triedKeys.includes(letter)) {
      return true;
    }
    return false;
  }

  // Arrow fx for binding 'this'
  getFeedbackForKey = letter => {
    const { currentWord, triedKeys } = this.state;
    if (triedKeys.includes(letter)) {
      if (currentWord.includes(letter)) {
        return "correct";
      }
      return "incorrect";
    }
    return "usable";
  }

  currentPlayerFeedback = id => {
    const { currentPlayerIndex, players } = this.state;
    if (id === players[currentPlayerIndex].id) {
      return "current";
    }
    return "not-current";
  }

  isWon() {
    const { currentWord, triedKeys } = this.state;
    for (const letter of Array.from(new Set(currentWord))) {
      if (!triedKeys.includes(letter)) {
        return false;
      }
    }
    return true;
  }

  addPlayer() {
    const { players } = this.state;
    let playerId = new Date().getTime();
    let playerName = "Joueur " + (players.length + 1);

    players.push(
      {
        id: playerId,
        playerName: playerName,
        tryNumber: 0,
        score: 0
      }
    );

    console.log(players);
    this.setState({ players: players });

  }

  newGame() {
    this.setState({ currentWord: this.generateWord() });
    this.setState({ triedKeys: [] });
    this.setState({ tryNumber: 0 });
    this.setState({ nbBadAnswer: 0 })
  }

  changePlayer() {
    const { currentPlayerIndex, players } = this.state;
    let newIndex = (currentPlayerIndex + 1) % players.length;
    this.setState({ currentPlayerIndex: newIndex })
  }

  render() {
    const { currentWord, players, maxPlayerNb, nbBadAnswer } = this.state;
    const won = this.isWon();
    const canPlayerJoin = players.length < maxPlayerNb;
    return (
      <div className="hangman">
        <div className="info-wrapper">
          <PlayerInfo playerInfo={players} feedback={this.currentPlayerFeedback} />
          {canPlayerJoin &&
            <button className="btn btn-add-player" onClick={() => this.addPlayer()}>Ajouter un joueur</button>
          }
        </div>
        <img className="hangman-img" src={hangmanImg[nbBadAnswer]} alt="pendu"></img>
        <div className="guess-wrapper">
          {currentWord.map((letter, index) => {
            return (
              <div key={index} className="guess-letter">
                <span>{this.isLetterFound(letter) ? letter : "_"}</span>
              </div>
            )
          })}
        </div>
        {won ?
          <button onClick={() => this.newGame()}>Rejouer</button>
          :
          <Keyboard keys={ALPHABET} onClick={this.handleKeyboardClick} feedback={this.getFeedbackForKey} />
        }
      </div>
    );
  }
}

export default App;
