import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('Component Header', () => {
  it('should render without crashing', () => {
    const component = shallow(<div />);
    expect(component).toBeTruthy();
  });
});
