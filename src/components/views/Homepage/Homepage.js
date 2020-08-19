import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getUsers } from '../../../redux/postsRedux';
// import { getUsers } from '../../../redux/userRedux';


import styles from './Homepage.module.scss';

import { Link } from 'react-router-dom';
import { Button, ListItem, List } from '@material-ui/core';


const Component = ({className, children, posts, users}) => (
  <div className={clsx(className, styles.root)}>
    {/* <h2>Homepage</h2> */}
    {/* {children} */}
    <List>
      {posts.map(post => (
        <ListItem key={post.id} className={styles.root} component={Link} to={`/post/${post.id}`} >
          {post.title}
        </ListItem>
      ))}
    </List>

    <Button component={Link} to={`/post/add`} variant="outlined" color="primary" >
      Add new poster
    </Button>

    {/* {users.map(
      user => {
        if(user.logged===true){
          return( 
            <Button key={user.id} component={Link} to={`/post/add`} variant="outlined" color="primary" >
              Add new poster
            </Button>
          );
        }
      }
    )} */}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  users: getUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);
// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
