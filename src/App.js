import React, { Component } from 'react';
import './App.css';
import Keyboard from './Keyboard';

class App extends Component {
  state = {
    currentWord: this.generateWord(),
    triedKeys: []
  }

  generateWord() {
    return ["R", "E", "A", "C", "T"];
  }

  // Arrow fx for binding 'this'
  handleKeyboardClick = key => {
    const { triedKeys } = this.state;
    //ignore click on same key
    if (triedKeys.includes(key)) {
      return;
    }

    this.setState({triedKeys: triedKeys.concat(key)}, () => {
      console.log(this.state.triedKeys);
    })
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
        return "correct"
      }
      return "incorrect"
    }
    return "usable";
  }

  render() {
    const { currentWord } = this.state;
    return (
      <div className="hangman">
        <div className="guess-wrapper">
          {currentWord.map((letter, index) => {
            return (
              <div key={index} className="guess-letter">
                <span>{this.isLetterFound(letter) ? letter : "_"}</span>
              </div>
            )
          })}
        </div>
        <Keyboard onClick={this.handleKeyboardClick} feedback={this.getFeedbackForKey}/>
      </div>
    );
  }
}

export default App;
