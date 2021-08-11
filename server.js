const path = require('path');
const http = require('http');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const socketio = require('socket.io');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const formatMessage = require('./utils/messages');
const sequelize = require('./config/connection');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
// Needed by socketio
const server = http.createServer(app);
const io = socketio(server);



const hbs = exphbs.create({ helpers });

// Session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);


// Code used for chatroom
// creates variable for chat bot
const botName = 'Bilingual Bot';

// Run when client connects
io.on('connection', socket => {
  // send from main.js around line 18
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    //Joins room selected by user
    socket.join(user.room);

    // Welcome current user
    // formatMessage is a function in utils/messages that adds the name and time to message
    socket.emit('message', formatMessage(botName, 'Welcome to Get bilingual chat!'));

    // Broadcast when a user connects
    // socket.broadcast sends to all users except current user in room
    // socket.io sends to all users
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info in sidebar
    // passed to main.js around line 21
    // also in disconnect script below around line 75
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage (around line 47 in main.js)
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    // sends message recieved back to all users in room
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3003;

// Initialize Server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});

// Script for Chat Room was created as a result of tutorial by:
// Brad Traversy at:
//   https://www.youtube.com/watch?v=jD7FnbI76Hg&t=1339s
//   https://github.com/bradtraversy/chatcord