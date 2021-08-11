// could create a database but currently using memory
const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  // Adding to user array
  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  // removes user from array (returns -1 if not found)
  //[0] is added so entire array is not returned
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
