import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, currentUser, getUsers, fetchPublished } from '../../../redux/postsRedux';

import styles from './Post.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

class Component extends React.Component {

  async componentDidMount(){
    const {fetchPublishedPosts} = this.props;
    await fetchPublishedPosts();
  }

  render(){
    const {className, posts, currentUser, getUsers } = this.props;

    const checkIfAdmin = () => getUsers.filter(user => user.id===currentUser&&user.admin===true);
    
    return(
      <div className={clsx(className, styles.root)}>
        {posts.filter(post => post._id === this.props.match.params.id).map(post => 
          (
            <div key={post._id}>
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
              {(currentUser === post.userId || checkIfAdmin().lenght) ? 
                (<Button component={Link} to={`/post/${post._id}/edit`} variant="outlined" color="primary" >
                  Edit post
                </Button>)
                : '' }
            </div>
          )
        )}
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


// const Container = connect(mapStateToProps)(Component);
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
