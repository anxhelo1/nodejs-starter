const UserController = require('../controllers/user_controller');
const passport = require('passport');
require('../services/passport');

module.exports = app => {

    app.post('/user', UserController.register);
    app.post('/login', UserController.login);
    //dummy route to test authentication
    app.get('/current_user',passport.authenticate('jwt', {session: false}), UserController.currentUser);
};