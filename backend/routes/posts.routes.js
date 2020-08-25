const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'});
      // .select('title dateOfPublication')
      // .sort({dateOfPublication: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else {res.json(result); console.log('req.param', req.params.id);}
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  // console.log('start router.post');
  try {
    const { _id, title, content, dateOfPublication, updateDate, email, status, photo, price, phone, location } = req.body;
    // console.log('try router.post');
    if(title && content && dateOfPublication && updateDate && status && email) {
      // console.log('if router.post');
      if(title.length >= 10 && content.length >= 20){
        // console.log('ifNo2 router.post');
        // let isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
        let isEmail = RegExp.prototype.test.bind(/^\S+@\S+\.\S+$/);
        if(isEmail(email) === true){
          const newPost = new Post({ ...req.body });
          // console.log('newPost at router.post', newPost);
          if(!newPost) res.status(404).json({ post: 'Not found' });
          else {
            await newPost.save();
            // console.log('succes at router.post, newPost:', newPost);
            res.json(newPost);
          }
        } 
        else {
          throw new Error('Write correct email adress');
        }
      } 
      else {
        throw new Error('Your title or content is too short');
      }
    } 
    else {
      throw new Error('You need to complete title, content, status, email ');
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

router.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, dateOfPublication, updateDate, email, status, photo, price, phone, location } = req.body;
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({message: 'Not found...'});
    else{
      // console.log('result', result);
      await Post.updateOne({ _id: req.params.id}, {$set: {title: title, content: content, email: email, status: status, photo: photo, price: price, phone: phone, location: location,
      }});
      const newResult = await Post
        .findById(req.params.id);
      await newResult.save();
      // console.log('success at put post', newResult);
      res.json({newResult});
    }
  }
  catch(err) {
    console.log('error at put post');
    res.status(500).json({message: 'error', err});
  }
});	


module.exports = router;
