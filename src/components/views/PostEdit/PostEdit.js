import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { currentUser, editPost, getUsers, getPost, getAll, updateThisPost } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import datePicker from 'date-and-time';

class Component extends React.Component {
  state = {
    data: {
      _id: this.props.posts.filter(item => item._id == this.props.match.params.id )[0]._id,
      title: this.props.posts.filter(item => item._id == this.props.match.params.id )[0].title,
      content: this.props.posts.filter(item => item._id == this.props.match.params.id )[0].content,
      dateOfPublication: this.props.posts.filter(item => item._id == this.props.match.params.id )[0].dateOfPublication,
      email: this.props.posts.filter(item => item._id == this.props.match.params.id )[0].email,
      status: this.props.posts.filter(item => item._id == this.props.match.params.id )[0].status,
      photo: this.props.posts.filter(item => item._id == this.props.match.params.id )[0].photo,
      price: this.props.posts.filter(item => item._id == this.props.match.params.id )[0].price,
      userId: this.props.posts.filter(item => item._id == this.props.match.params.id )[0].userId,
    },
  };

  componentDidMount(){
    const today = new Date();
    this.setState({data: {...this.state.data,  updateDate: datePicker.format(today, 'DD.MM.YYYY') }});
    // const inputData = this.props.posts.filter(item => item._id == this.props.match.params.id );

    // console.log('this.state in componentDidMouth', this.state);
  } 
  completeData = (dataToEdit) => {
    const newData = {};
    const { data } = this.state;
    for(let dataName in data){
      if(!data[dataName]){
        newData[dataName] = dataToEdit[dataName];
      }

    }
    this.setState({data: {
      ...data,
      title: (newData.title ? newData.title : data.title),
      content: (newData.content ? newData.content : data.content),
      email: (newData.email ? newData.email : data.email),
      status: (newData.status ? newData.status : data.status),
      photo: (newData.photo ? newData.photo : data.photo),
      price: (newData.price ? newData.price : data.price),
    }});
    // console.log('this.state in completeData', this.state);
  }

  changeInput = (event, name) => {
    event.preventDefault();
    const { data } = this.state;
    this.setState({
      data: {...data, [name]: event.target.value},
    });
    // console.log('this.state in changeInput', this.state);
  };

  async handleSubmit (event, dataToEdit) {
    event.preventDefault();
    const { data } = this.state;
    const { completeData } = this;
    await completeData(dataToEdit);

    const { updateThisPost } = this.props;
    await updateThisPost (this.props.match.params.id, data);
    await this.props.editPost(data);

    alert('You edited post', );
  }
  
  render(){
    const { title, price, content, email, status } = this.state.data;
    const {className, posts} = this.props;
    const dataToEdit = posts;
    // console.log('this.state in render function', this.state);

    const titleLenght = {
      minLength: 10,
    };
  
    const contentLenght = {
      minLength: 20,
    };
  
    const checkIfAdminOrUser = () => this.props.getUsers.filter(user => user.id===this.props.currentUser||user.admin===true);

    return checkIfAdminOrUser().length ? (
      <div className={clsx(className, styles.root)}>
        <h2>Post</h2>
        <form className={styles.root} noValidate autoComplete="off" onSubmit={e => this.handleSubmit(e, dataToEdit)}>
          <TextField 
            id="standard-basic" 
            label="Title"
            required
            type="text"
            inputProps={titleLenght}
            defaultValue={dataToEdit.title}
            value={title}
            onChange={e => this.changeInput(e, 'title')}
          /><br />
          <TextField
            id="standard-full-width"
            label="Content"
            required
            type="text"
            fullWidth
            inputProps={contentLenght}
            defaultValue={dataToEdit.content}
            value={content}
            onChange={e => this.changeInput(e, 'content')}
          /><br />
          <TextField 
            id="standard-basic" 
            label="Email" 
            required 
            type="email"
            defaultValue={dataToEdit.email}
            value={email}
            onChange={e => this.changeInput(e, 'email')}
          /><br />
          <TextField 
            id="standard-basic" 
            label="Price" 
            required
            type="number"
            defaultValue={dataToEdit.price}
            value={price==null ? '' : price}
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
          <InputLabel 
            id="demo-simple-select-label" 
            required
          >Status</InputLabel>
          <Select
            labelId="post-status-label"
            defaultValue={dataToEdit.status}
            value={status}
            id="post-status-select"
            onChange={e => this.changeInput(e, 'status')}

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
  singlePost: getPost(state, props.match.params.id),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  editPost: post => dispatch(editPost(post)),
  updateThisPost: (id, newPost) => dispatch(updateThisPost(id, newPost)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};