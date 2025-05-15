const express = require('express');
const { register, login } = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../validations/userValidation');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);

module.exports = router;
