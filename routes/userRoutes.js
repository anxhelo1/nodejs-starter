const UserController = require('../controllers/user_controller');
module.exports = app => {

    app.post('/user', UserController.register);
};