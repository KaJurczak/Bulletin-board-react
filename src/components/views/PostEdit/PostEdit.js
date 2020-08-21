import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { currentUser, editPost, getUsers, getPost } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import datePicker from 'date-and-time';

class Component extends React.Component {
  state = {
    id: this.props.post.id,
    title: this.props.post.title,
    content: this.props.post.content,
    dateOfPublication: this.props.post.dateOfPublication,
    email: this.props.post.email,
    status: this.props.post.status,
    photo: this.props.post.photo,
    price: this.props.post.price,
    userId: this.props.post.userId,
  };

  componentDidMount(){
    const today = new Date();
    this.setState({ updateDate: datePicker.format(today, 'DD.MM.YYYY') });
  }

  handleChange = (event, name) => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.editPost(this.state);
    alert('You edited post');
  };
  
  render(){
    const { title, price, content, email, status } = this.state;
    const {className} = this.props;

    const titleLenght = {
      minLength: 10,
    };
  
    const contentLenght = {
      minLength: 20,
    };
  
    const checkIfAdmin = () => this.props.getUsers.filter(user => user.id===this.props.currentUser&&user.admin===true);

    return checkIfAdmin().length ? (
      <div className={clsx(className, styles.root)}>
        <h2>Post</h2>
        <form className={styles.root} noValidate autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
          <TextField 
            id="standard-basic" 
            label="Title" 
            required
            inputProps={titleLenght}
            value={title}
            onChange={e => this.handleChange(e, 'title')}
          /><br />
          <TextField
            id="standard-full-width"
            label="Content"
            required
            fullWidth
            inputProps={contentLenght}
            value={content}
            onChange={e => this.handleChange(e, 'content')}
          /><br />
          <TextField 
            id="standard-basic" 
            label="Email" 
            required 
            type="email"
            value={email}
            onChange={e => this.handleChange(e, 'email')}
          /><br />
          <TextField 
            id="standard-basic" 
            label="Price" 
            required
            type="number"
            value={price}
            onChange={e => this.handleChange(e, 'price')}
          /><br />
          <Button 
            variant="outlined"  
            component="label" 
          >
              Add picture
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }}  
              onChange={e => this.handleChange(e, 'image')} 
            />
          </Button><br />
          <InputLabel id="demo-simple-select-label" >Status</InputLabel>
          <Select
            labelId="post-status-label"
            value={status}
            id="post-status-select"
            onChange={e => this.handleChange(e, 'status')}

          >
            <MenuItem value={'draft'}>draft</MenuItem>
            <MenuItem value={'published'}>published</MenuItem>
            <MenuItem value={'closed'}>closed</MenuItem>
          </Select><br />
          <Button type="submit" variant="outlined" color="primary" className={styles.button}>Edit post</Button>
        </form>
      </div>
    ) : (
      <div className={clsx(className, styles.root)}>
        <h2>You are not allowed to edit this post</h2>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  editPost: PropTypes.func,
  getUsers: PropTypes.array,
  currentUser: PropTypes.string,
  post: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  currentUser: currentUser(state),
  getUsers: getUsers(state),
  post: getPost(state, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  editPost: post => dispatch(editPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
