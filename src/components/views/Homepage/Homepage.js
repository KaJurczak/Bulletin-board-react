import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, currentUser, getUsers, fetchPublished } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';

import { Link } from 'react-router-dom';
import { Button, ListItem, List } from '@material-ui/core';

class Component extends React.Component {
  
  async componentDidMount(){
    const {fetchPublishedPosts} = this.props;
    await fetchPublishedPosts();
  }

  render() {
    const {className, posts, currentUser, getUsers} = this.props;

    const checkUser = () => getUsers.filter(user => user.id===currentUser);
    const checkIfAdmin = () => getUsers.filter(user => user.id===currentUser&&user.admin===true);

    const newPost = (checkUser().length || checkIfAdmin().length) ?
      (<Button component={Link} to={`/post/add`} variant="outlined" color="primary" >
        Add new post
      </Button>)
      : '' ;

    return(
      <div className={clsx(className, styles.root)}>
        <List>
          {posts.map(post => (
            <ListItem key={post._id} className={styles.root} component={Link} to={`/post/${post._id}`} >
              {post.title}
            </ListItem>
          ))}
        </List>
        {newPost}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  currentUser: PropTypes.string,
  getUsers: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  currentUser: currentUser(state),
  getUsers: getUsers(state),
});

const mapDispatchToProps = (dispatch, state) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
