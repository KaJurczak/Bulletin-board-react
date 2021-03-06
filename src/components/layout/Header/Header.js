import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, currentUser, getUsers } from '../../../redux/postsRedux';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


const Component = ({className, children, posts, currentUser, getUsers}) => {

  const checkUser = () => getUsers.filter(user => user.id===currentUser);

  const newPost = (checkUser().length) ?
    (
      <div className={clsx(styles.root)}>
        <Button component={Link} to={`/post/userPosts`} variant="outlined" color="primary" >
          Your posts
        </Button>
        <Button component={Link} to={`/`} variant="outlined" color="primary" >
          LogOut
        </Button>
      </div>
    )
    : 
    (
      <Button component={Link} to={`https://google.com`} variant="outlined" color="primary" >
        LogIn
      </Button>
    ) ;

  return(
    <div className={clsx(className, styles.root)}>
      {newPost}
    </div>
  );
};
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  currentUser: PropTypes.string,
  getUsers: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  currentUser: currentUser(state),
  getUsers: getUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
