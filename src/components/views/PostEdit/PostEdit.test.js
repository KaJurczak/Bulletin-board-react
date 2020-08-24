import React from 'react';
import { shallow } from 'enzyme';
import { PostEdit } from './PostEdit';

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<div />);
    expect(component).toBeTruthy();
  });
});
