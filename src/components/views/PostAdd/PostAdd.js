import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { currentUser, addPost, getUsers, addNewPost } from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import shortid from 'shortid';
import datePicker from 'date-and-time';

class Component extends React.Component {
  state = {
    data: {
      _id: shortid.generate(),
      title: '',
      content: '',
      email: '',
      status: 'published',
      photo: '',
      price: '',
      phone: '',
      location: '',
      userId: this.props.currentUser,
    },
  };

  componentDidMount(){
    const today = new Date();
    this.setState({data: {...this.state.data, dateOfPublication: datePicker.format(today, 'DD.MM.YYYY'), updateDate: datePicker.format(today, 'DD.MM.YYYY') }});
  }

  
  changeInput = (event, name) => {
    event.preventDefault();
    const { data } = this.state;
    this.setState({
      data: {...data, [name]: event.target.value,
      }});
  };

  handleSubmit (event) {
    event.preventDefault();

    const { data } = this.state;
    const { addNewPost, addPost } = this.props;
    addNewPost(data);

    addPost(data);
    alert('You added post');
  }
  
  render(){
    const { title, price, content, email, status } = this.state.data;
    const {className} = this.props;

    const titleLenght = {
      minLength: 10,
    };
  
    const contentLenght = {
      minLength: 20,
    };
  
    const checkUser = () => this.props.getUsers.filter(user => user.id===this.props.currentUser);

    return checkUser().length ? (
      <div className={clsx(className, styles.root)}>
        <h2>Post</h2>
        <form className={styles.root} noValidate autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
          <TextField 
            id="standard-basic" 
            label="Title" 
            required
            inputProps={titleLenght}
            value={title}
            onChange={e => this.changeInput(e, 'title')}
          /><br />
          <TextField
            id="standard-full-width"
            label="Content"
            required
            fullWidth
            inputProps={contentLenght}
            value={content}
            onChange={e => this.changeInput(e, 'content')}
          /><br />
          <TextField 
            id="standard-basic" 
            label="Email" 
            required 
            type="email"
            value={email}
            onChange={e => this.changeInput(e, 'email')}
          /><br />
          <TextField 
            id="standard-basic" 
            label="Price" 
            required
            type="number"
            value={price}
            onChange={e => this.changeInput(e, 'price')}
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
              onChange={e => this.changeInput(e, 'image')} 
            />
          </Button><br />
          <InputLabel id="demo-simple-select-label" >Status</InputLabel>
          <Select
            labelId="post-status-label"
            value={status}
            id="post-status-select"
            onChange={e => this.changeInput(e, 'status')}

          >
            <MenuItem value={'draft'}>draft</MenuItem>
            <MenuItem value={'published'}>published</MenuItem>
            <MenuItem value={'closed'}>closed</MenuItem>
          </Select><br />
          <Button type="submit" variant="outlined" color="primary" className={styles.button}>Add post</Button>
        </form>
      </div>
    ) : (
      <div className={clsx(className, styles.root)}>
        <h2>You need to be login to add post</h2>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  addPost: PropTypes.func,
  getUsers: PropTypes.array,
  currentUser: PropTypes.string,
};

const mapStateToProps = state => ({
  currentUser: currentUser(state),
  getUsers: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
  addNewPost: newPost => dispatch(addNewPost(newPost)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostAdd,
  Component as PostAddComponent,
};
