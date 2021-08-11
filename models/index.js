const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//const { Blog } = require('../controllers/home-Routes');

User.hasMany(Blog, {
  foreignKey: 'username_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'

});

Blog.belongsTo(User, {
  foreignKey: 'username_id',
  oDelete: 'CASCADE',
});

Blog.hasMany(Comment, {
    foreignKey:'blog_id'
    
});


Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
});






module.exports = { User, Blog, Comment };