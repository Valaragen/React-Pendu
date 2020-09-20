import React from 'react';
import PropTypes from 'prop-types'
import './Keyboard.css';

const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const Keyboard = ({ onClick, feedback }) => {
    return (
        <div className="keyboard">
            {ALPHABET.map((letter, index) => {
                return (
                    <div key={index} className={`keyboard-key ${feedback(letter)}`} onClick={() => onClick(letter)}>
                        <span className="symbol">{letter}</span>
                    </div>
                )
            })}
        </div>
    )
}

Keyboard.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Keyboard;