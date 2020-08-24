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
    const newPost = new Post({ ...req.body });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ messaage: err });
  }
});

// router.post('/posts', async (req, res) => {
//   try {
//     const { _id, title, content, dateOfPublication, updateDate, email, status, photo, price, phone, location } = req.body;

//     const changePost = new Post({ _id: _id, title: title, content: content, dateOfPublication: dateOfPublication, updateDate: updateDate, email: email, status: status, photo: photo, price: price, phone: phone, location: location, 
//     });
//     await changePost.save();
//     res.json({ message: 'You change post'});
//     if(!changePost) res.status(404).json({ post: 'Not found' });
//     else {res.json('changePost');}
//   }
//   catch(err) {
//     res.status(500).json(err);
//   }
// });

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
