const express = require('express');
const {
  createTicket,
  getTickets,
  addComment,
  updateStatus,
  deleteTicket,
  editTicket,
  getSingleTicketByAdmin,
  getUserTickets
} = require('../controllers/ticketController');
const protect = require('../middlewares/auth');
const checkIsAdmin = require('../middlewares/role');
const router = express.Router();

// ✅ Specific user/admin routes first
router.post('/', protect, createTicket);
router.get('/my-tickets', protect, getUserTickets); // ✅ Moved before :ticketId
router.get('/', protect, checkIsAdmin, getTickets);
router.post('/:ticketId/comments', protect, checkIsAdmin, addComment);
router.patch('/:ticketId/status', protect, checkIsAdmin, updateStatus);
router.delete('/:ticketId', protect, checkIsAdmin, deleteTicket);
router.patch('/:ticketId', protect, editTicket);
router.get('/:ticketId', protect, getSingleTicketByAdmin); // ❗ Catch-all LAST

module.exports = router;
