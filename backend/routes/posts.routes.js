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

router.post('/posts/add', async (req, res) => {
  try {
    const { _id, title, content, dateOfPublication, updateDate, email, status, photo, price, phone, location } = req.body;

    if(title && content && dateOfPublication && updateDate && email && status) {
      if(title.length >= 10 && content.length >= 20){
        // let isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
        let isEmail = RegExp.prototype.test.bind(/^\S+@\S+\.\S+$/);
        if(isEmail(email) === true){
          console.log('req.body', req.body);
          const newPost = new Post({ ...req.body });
          if(!newPost) res.status(404).json({ post: 'Not found' });
          else {
            await newPost.save();
            res.json(newPost);
          }
        }
      }
    }
  } catch (err) {
    res.status(500).json({ messaage: err });
  }
});

router.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, dateOfPublication, updateDate, email, status, photo, price, phone, location } = req.body;
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({message: 'Not found...'});
    else{
      await Post.updateOne({ _id: req.params.id}, {$set: {title: title, content: content, email: email, status: status, photo: photo, price: price, phone: phone, location: location,
      }});
      await Post.save();
      res.json({message: 'Post updated'});
    }
  }
  catch(err) {
    res.status(500).json({message: 'error', err});
  }
});	


module.exports = router;
