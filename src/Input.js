import React from 'react';
import PropTypes from 'prop-types';

function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  return (
    <div data-test='component-input'>
      <form className='component-input'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          placeholder='guess'
          type='test'
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          type='button'
          data-test='submit-button'
          className='btn btn-primary'
          onClick={(e) => {
            e.preventDefault();
            setCurrentGuess('');
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
