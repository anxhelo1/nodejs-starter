const User = require('../models/user');
const {SALT_ROUNDS} = require('../config/keys');
const bcrypt = require('bcrypt');

module.exports = {
    async register(req, res, next) {
        const {username, password} = req.body;
        //check if user exists or not
        //if not save the user
        const user = await User.findOne({username}).catch(next);
        if (!user) {
            //hash password and save user
            const hash = await bcrypt.hash(password, SALT_ROUNDS).catch(next);
            const newUser = await User.create({username, password: hash}).catch(next);
            //return new user
            res.json(newUser);
        }
        //username exists!
        res.status(400).json({error: "username already exists"});
    }
};