const mongoose = require("mongoose");
const EventEmitter = require("events");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

const createNewUserEvent = new EventEmitter();
createNewUserEvent.on('user_registered', async ({user_id, name, email, password}) => {

    const User = mongoose.model("User");

    const user = new User({
        _id: user_id,
        name,
        email,
        password: sha256(password + process.env.SALT),
      });
    
      await user.save();
});

module.exports = createNewUserEvent;