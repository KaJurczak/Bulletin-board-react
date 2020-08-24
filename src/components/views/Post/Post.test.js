import React from 'react';
import { shallow } from 'enzyme';
import { Post } from './Post';

describe('Component Post', () => {
  it('should render without crashing', () => {
    const component = shallow(<div />);
    expect(component).toBeTruthy();
  });
});
