import React from 'react';
import PropTypes from 'prop-types';
import './Keyboard.css';

const Keyboard = ({ keys, onClick, feedback }) => (
    <div className="keyboard">
        {keys.map((letter, index) => {
            return (
                <div key={index} className={`keyboard-key ${feedback(letter)}`} onClick={() => onClick(letter)}>
                    <span className="symbol">{letter}</span>
                </div>
            )
        })}
    </div>
)

Keyboard.propTypes = {
    keys: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    feedback: PropTypes.func.isRequired
}

export default Keyboard;