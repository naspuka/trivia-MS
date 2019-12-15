const auth = require('./middleware/auth');
const {User, validate} = reqiure('./routes/user.js');
const expresss = require('express');
const bcrypt = require('bcrypt');
