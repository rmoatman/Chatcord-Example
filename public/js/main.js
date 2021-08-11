// allows access to chat form
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
// uses Qs library (installed as script in chat.html)
// ignoreQueryPrefex:true ignores ampersand and question mark, etc.
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
// caught on the server side around line 27
socket.emit('joinRoom', { username, room });

// Get room and users to refres sidebar
// from server.js around lines 50 or 75
socket.on('roomUsers', ({ room, users }) => {
  // DOM related functions below around line 76
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  // Allows new message to appear at the bottom of list
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit listens for a message in the form
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  // msg is the field name in chat.html
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server (server.js)
  socket.emit('chatMessage', msg);

  // Clear input in text box once send was submitted
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
// room-name is id in chat.html  roomName is const defined above
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
// users is id in chat.html  userList is const defined above
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});