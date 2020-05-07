import React, { useEffect } from 'react';
import hookActions from './actions/hookActions';

import Input from './Input';

/**
 * reducer to update state
 * @param {object} state
 * @param {object} action
 * @return {object} - new state
 */
function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const setSecretWord = (secretWord) =>
    dispatch({ type: 'setSecretWord', payload: secretWord });

  React.useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    hookActions.getSecretWord(setSecretWord);
  }, []);

  let content;
  if (state.secretWord) {
    content = (
      <div data-test='app' className='App'>
        <Input secretWord={state.secretWord} />
      </div>
    );
  } else {
    content = (
      <div data-test='spinner' className='container'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
          <p>Loading secret word</p>
        </div>
      </div>
    );
  }

  return content;
}

export default App;
