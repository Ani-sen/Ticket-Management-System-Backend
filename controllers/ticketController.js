const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  const { title, description, priority } = req.body;
  const ticket = new Ticket({
    title,
    description,
    priority,
    createdBy: req.user.id,
  });

  await ticket.save();
  res.status(201).json(ticket);
};


exports.editTicket = async (req, res) => {
  const { ticketId } = req.params;
  const updates = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Optional: Allow only ticket creator or admin
    if (ticket.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to edit this ticket' });
    }

    // Update allowed fields
    if (updates.title) ticket.title = updates.title;
    if (updates.description) ticket.description = updates.description;
    if (updates.status) ticket.status = updates.status;

    const updatedTicket = await ticket.save();

    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find().populate('createdBy', 'name email');
  res.json(tickets);
};


exports.addComment = async (req, res) => {
  const { ticketId } = req.params;
  const { body } = req.body;

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  ticket.comments.push({
    body,
    commentedBy: req.user.id,
  });

  await ticket.save();
  res.status(201).json(ticket);
};


exports.updateStatus = async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  ticket.status = status;
  await ticket.save();
  res.json(ticket);
};


exports.deleteTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.deleteOne();
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
