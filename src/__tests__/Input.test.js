/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../../test/testUtils';
import Input from '../Input';

const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />);
};

describe('state controlled input field', () => {
  const mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

    wrapper = setup();
  });
  test('state updates on simulating onChange Event', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    // simulating input values getting a value of train
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('reset state when submit is called', () => {
    const button = findByTestAttr(wrapper, 'submit-button');
    button.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
