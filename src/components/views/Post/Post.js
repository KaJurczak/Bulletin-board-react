import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPost, getUsers } from '../../../redux/postsRedux';

import styles from './Post.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Component = ({className, post, users}) => {

  const editPost = users.map(user => 
    user.id === post.userId ?
      (<Button key={user.id} component={Link} to={`/post/:id/edit`} variant="outlined" color="primary" >
        Edit poster
      </Button>)
      : ''
  );

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
  users: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state, props.match.params.id),
  users: getUsers(state),
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
