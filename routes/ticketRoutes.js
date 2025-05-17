const express = require('express');
const { createTicket, getTickets, addComment, updateStatus, deleteTicket, editTicket, getSingleTicketByAdmin } = require('../controllers/ticketController');
const protect = require('../middlewares/auth');
const checkIsAdmin = require('../middlewares/role');
const router = express.Router();

router.post('/', protect, createTicket);
router.get('/', protect,checkIsAdmin("admin"), getTickets);
router.post('/:ticketId/comments', protect,checkIsAdmin("admin"), addComment); // 👈 Add comment
router.patch('/:ticketId/status', protect,checkIsAdmin("admin"), updateStatus); // 👈 Status update
router.delete('/:ticketId', protect, checkIsAdmin('admin'), deleteTicket);
router.patch('/:ticketId', protect, editTicket); // 👈 Edit ticket route
router.get('/admin/:ticketId', protect, checkIsAdmin('admin'), getSingleTicketByAdmin);

module.exports = router;
