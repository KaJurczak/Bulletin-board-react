import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPost, currentUser, getUsers } from '../../../redux/postsRedux';

import styles from './Post.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Component = ({className, post, currentUser, getUsers }) => {

  const checkIfAdmin = () => getUsers.filter(user => user.id===currentUser&&user.admin===true);

  const editPost = (currentUser === post.userId || checkIfAdmin().length)?
    (<Button component={Link} to={`/post/${post.id}/edit`} variant="outlined" color="primary" >
      Edit post
    </Button>)
    : '' ;

  return(
    <div className={clsx(className, styles.root)}>
      <h2>Post</h2>
      <p>title: {post.title} </p>
      <p>content:  {post.content} </p>
      <p>date Of Publication: {post.dateOfPublication} </p>
      <p>update Date: {post.updateDate} </p>
      <p>email: {post.email} </p>
      <p>status: {post.status} </p>
      <p>photo: {post.photo} </p>
      <p>price: {post.price} </p>
      <p>userId: {post.userId} </p>
      {editPost}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  currentUser: PropTypes.string,
  getUsers: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params.id),
  currentUser: currentUser(state),
  getUsers: getUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);
// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
