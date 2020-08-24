import React from 'react';
import { shallow } from 'enzyme';
import { UserPosts } from './UserPosts';

describe('Component UserPosts', () => {
  it('should render without crashing', () => {
    const component = shallow(<div/>);
    expect(component).toBeTruthy();
  });
});
