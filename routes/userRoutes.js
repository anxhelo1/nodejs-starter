const UserController = require('../controllers/user_controller');
const passport = require('passport');
const FileUploader = require('../services/file_uploader');
require('../services/passport');

module.exports = app => {

    app.post('/user', FileUploader.single('avatar'), UserController.register);
    app.post('/login', UserController.login);
    //dummy route to test authentication
    app.get('/current_user',passport.authenticate('jwt', {session: false}), UserController.currentUser);
};