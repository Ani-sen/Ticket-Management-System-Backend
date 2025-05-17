const express = require('express');
const { createTicket, getTickets, addComment, updateStatus, deleteTicket, editTicket, getSingleTicketByAdmin, getUserTickets } = require('../controllers/ticketController');
const protect = require('../middlewares/auth');
const checkIsAdmin = require('../middlewares/role');
const router = express.Router();

router.post('/', protect, createTicket);
router.get('/', protect,checkIsAdmin, getTickets);
router.post('/:ticketId/comments', protect,checkIsAdmin, addComment); // 👈 Add comment
router.patch('/:ticketId/status', protect,checkIsAdmin, updateStatus); // 👈 Status update
router.delete('/:ticketId', protect, checkIsAdmin, deleteTicket);
router.patch('/:ticketId', protect, editTicket); // 👈 Edit ticket route
router.get('/:ticketId', protect, getSingleTicketByAdmin);
router.get('/my-tickets', protect, getUserTickets);

module.exports = router;
