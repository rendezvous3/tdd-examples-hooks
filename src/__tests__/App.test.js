/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { findByTestAttr } from '../../test/testUtils';
import App from '../App';

import hookActions from '../actions/hookActions';

const mockSecretWord = jest.fn();

/**
 * Setup function for app component
 * @returns {ReactWrapper}
 */
const setup = () => {
  mockSecretWord.mockClear();
  // eslint-disable-next-line import/no-named-as-default-member
  hookActions.getSecretWord = mockSecretWord;

  // use mount, because useEffect is not called on shallow
  // https://github.com/enzymejs/enzyme/issues/2086
  return mount(<App />);
};

describe('app renders without an error', () => {
  test('renders', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'app');
    expect(component.length).toBe(1);
  });
});

describe('getSecretWord calls', () => {
  test('getSecretWord is gets called on App mount', () => {
    setup();
    expect(mockSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    // makes sure that mock will be tracked after initial render
    mockSecretWord.mockClear();

    // wrapper update doesnt trigger useEffect()
    wrapper.setProps();

    expect(mockSecretWord).not.toHaveBeenCalled();
  });
});

// describe('Testing useEffect', () => {
//   test('', () => {
//     const mockSecret = jest.fn();
//     hookActions.getSecretWord = mockSecret;
//     let useEffect;
//     let wrapper;
//     const mockUseEffect = () => {
//       useEffect.mockImplementationOnce((f) => f());
//     };
//     useEffect = jest.spyOn(React, 'useEffect');
//     mockUseEffect();
//     wrapper = shallow(<App />);
//     wrapper = mount(<App />);
//     expect(mockSecret).toHaveBeenCalled();
//   });
// });
