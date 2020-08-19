import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPost, currentUser } from '../../../redux/postsRedux';

import styles from './Post.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Component = ({className, post, currentUser }) => {

  const editPost = currentUser === post.userId ?
    (<Button component={Link} to={`/post/:id/edit`} variant="outlined" color="primary" >
      Edit poster
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
      {editPost}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  currentUser: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params.id),
  currentUser: currentUser(state),
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
