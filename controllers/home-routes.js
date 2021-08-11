const router = require('express').Router();
const { response } = require('express');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');


// HOMEPAGE IF LOGGED IN
router.get('/', withAuth, async (req, res) => {

   try {

    const blogData = await Blog.findAll({
      attributes: [
        'id',
        'date',
        'title',
        'content'
      ],

      include: [
        {model: User, attributes: ['username']},
        {model: Comment, attributes: ['date', 'comment_text', 'user_id']},
      ]
      });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,

    });

  } catch (err) {
    res.status(503).json(err);
  }
}); // end HOMEPAGE


// SINGLE POST
router.get('/postpage/:id', withAuth, async (req, res) => {

  try {
    const postData = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['date', 'comment_text', 'user_id']}
       ],
    });

    const post = postData.get({ plain: true });

    res.render('postpage', {
      post,
      logged_in: req.session.logged_in

    });

  } catch (err) {
    res.status(404).json({ message: 'No post found with that ID.' });
  }
}); // end of SINGLE POST


// NEW COMMENT VIEW (from home-routes.js)
router.get('/newcomment/:id', withAuth, async (req, res) => {

  try {
    const postData = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['date', 'comment_text']}
       ],
    });

    const post = postData.get({ plain: true });

    res.render('newcomment', {
      post,
      logged_in: req.session.logged_in

    });

  } catch (err) {
    res.status(404).json({ message: 'No post found with that ID.' });
  }
}); // end NEW COMMENT VIEW


// POST NEW COMMENT (sent here from addcomments.js)
router.post('/comment', withAuth, async (req, res) => {

  if(req.session) {

    Comment.create ({
      date: req.body.comment_date,
      blog_id: req.body.blog_id,
      comment_text: req.body.commentText,
      user_id: req.session.user_id,
    })
    
  } else (err => {
      res.status(400).json.user_id(err);
    })
  
}); // end of POST NEW COMMENT


// DASHBOARD VIEW
router.get('/dashboard', withAuth, async (req, res) => {

  try {
    
   const blogData = await Blog.findAll({
     where: { username_id: req.session.user_id },
    
      attributes: [
       'id',
       'date',
       'title',
       'content'
     ],

     include: [
       {model: User, attributes: [ 'id', 'username']},
       {model: Comment, attributes: ['date', 'comment_text', 'user_id']},
     ]
  });

   const blogs = blogData.map((blog) => blog.get({ plain: true }));

   res.render('dashboard', {
     blogs,
     logged_in: req.session.logged_in,

   });

 } catch (err) {
   res.status(503).json(err);
 }
}); // end DASHBOARD VIEW


// NEW POST VIEW
router.get('/newpostview', withAuth, async (req, res) => {

  try {
    const postData = await Blog.findOne({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['date', 'comment_text']}
       ],
    });

    const post = postData.get({ plain: true });

    res.render('newpostview', {
      post,
      logged_in: req.session.logged_in

    });


  } catch (err) {
    res.status(404).json(err);
  }
}); // end NEW POST VIEW


// NEW POST
router.post('/newpost', withAuth, (req, res) => {

  if(req.session) {

     Blog.create ({
      date: req.body.date,
      title: req.body.post_title,
      content: req.body.post_content,
      username_id: req.session.user_id,
    })

  } else (err => {
        res.status(400).json.user_id(err);
    });
  
}); // end of POST NEW COMMENT


// EDIT POST VIEW
router.get('/editpost/:id', withAuth, async (req, res) => {

  try {
    const postData = await Blog.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['date', 'comment_text', 'user_id']}
       ],
    });

    const post = postData.get({ plain: true });

    res.render('editpost', {
      post,
      logged_in: req.session.logged_in

    });

  } catch (err) {
    res.status(404).json({ message: 'No post found with that ID.' });
  }
}); // end of EDIT POST VIEW


// EDITED POST
router.put('/editedpost', withAuth, (req, res) => {

  if(req.session) {
    console.log("req.body.post_title");
    console.log(req.body.post_title);
    console.log(req.body.id);

     Blog.update(
      {
      title: req.body.post_title,
      content: req.body.post_content,
      },
      {where: { id: req.body.post_id }},
    );

  } else (err => {
        res.status(400).json.user_id(err);
    });
  
}); // end of EDIT POST


// DELETE SINGLE POST
router.get('/deletepost/:id', withAuth,  async (req, res) => {

 await Blog.destroy({
      where: { id: req.params.id },
    });

    const blogData = await Blog.findAll({
      attributes: [
        'id',
        'date',
        'title',
        'content'
      ],

      include: [
        {model: User, attributes: ['username']},
        {model: Comment, attributes: ['comment_text']},
      ]
      });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });

}); // end DELETE SINGLE POST


// LOGIN
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // If directed to login, then listeners in login.js are called
  res.render('login');
}); // end of LOGIN

// // CHAT
// router.get('/chat', (req, res) => {

//   if (req.session.logged_in) {
//     res.redirect('/chat');
//     return;
//   }

// }); // end of CHAT

// HOMEPAGE IF LOGGED IN
router.get('/index.html', withAuth, async (req, res) => {

  try {

   const blogData = await Blog.findAll({
     attributes: [
       'id',
       'date',
       'title',
       'content'
     ],

     include: [
       {model: User, attributes: ['username']},
       {model: Comment, attributes: ['date', 'comment_text', 'user_id']},
     ]
     });
   const blogs = blogData.map((blog) => blog.get({ plain: true }));

   res.render('homepage', {
     blogs,
     logged_in: req.session.logged_in,

   });

 } catch (err) {
   res.status(503).json(err);
 }
}); // end HOMEPAGE


module.exports = router;
