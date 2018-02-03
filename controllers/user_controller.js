const User = require('../models/user');
const jwt = require('jwt-simple');
const {SALT_ROUNDS, JWT_SECRET_KEY} = require('../config/keys');
const bcrypt = require('bcrypt');

module.exports = {

    currentUser(req, res, next) {
        //user is already injected by passport middleware
        res.json({user: req.user});
    },
    //add user route
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
    },
    //sign in route
    async login(req, res, next) {
        const {username, password} = req.body;

        const user = await User.findOne({username}).catch(next);
        if (user) {
            user.comparePassword(password, (error, isMatch) => {
                console.log(error);
                if (error) {
                    next(error);
                }
                if (!isMatch) {
                    res.status(400).json('invalid username/password combination');
                }
                const timestamp = new Date().getTime();
                const token = jwt.encode({id: user.id, iat: timestamp}, JWT_SECRET_KEY);
                res.status(200).json({token});
            });
        } else {
            res.status(400).json({error: 'invalid username/password combination'});
        }

    }
};