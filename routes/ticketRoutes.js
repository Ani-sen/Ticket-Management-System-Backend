const express = require('express');
const { createTicket, getTickets, addComment, updateStatus, deleteTicket, editTicket } = require('../controllers/ticketController');
const protect = require('../middlewares/auth');
const checkRole = require('../middlewares/role');
const router = express.Router();

router.post('/', protect, createTicket);
router.get('/', protect,checkRole("admin"), getTickets);
router.post('/:ticketId/comments', protect,checkRole("admin"), addComment); // 👈 Add comment
router.patch('/:ticketId/status', protect,checkRole("admin"), updateStatus); // 👈 Status update
router.delete('/:ticketId', protect, checkRole('admin'), deleteTicket);
router.patch('/:ticketId', protect, editTicket); // 👈 Edit ticket route

module.exports = router;
