const express = require('express');
const User = require('../models/User');
const protect = require('../middlewares/auth');
const checkIsAdmin = require('../middlewares/role');

const router = express.Router();

// Get all users (admin only)
router.get('/users', protect, checkisAdmin('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Delete user
router.delete('/users/:id', protect, checkIsAdmin('admin'), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
