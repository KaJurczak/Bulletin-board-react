import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, currentUser, getUsers } from '../../../redux/postsRedux';

import styles from './UserPosts.module.scss';

import { Link } from 'react-router-dom';
import { Button, ListItem, List } from '@material-ui/core';


const Component = ({className, posts, currentUser, getUsers}) => {

  const checkUser = () => getUsers.filter(user => user.id===currentUser);

  const newPost = (checkUser().length) ?
    (<Button component={Link} to={`/post/add`} variant="outlined" color="primary" >
      Add new post
    </Button>)
    : '' ;
  
  console.log();

  return(
    <div className={clsx(className, styles.root)}>
      <List>
        {posts.map(post => {
          console.log(post.userId);
          console.log(currentUser);
          if(post.userId===currentUser)return(
            <ListItem key={post.id} className={styles.root} component={Link} to={`/post/${post.id}`} >
              {post.title}
            </ListItem>
          );}
        )}
      </List>
      {newPost}
    </div>
  );
};

Component.propTypes = {
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
  // Component as UserPosts,
  Container as UserPosts,
  Component as UserPostsComponent,
};
