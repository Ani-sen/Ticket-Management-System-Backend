const express = require("express")
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const errorHandler = require("./middlewares/errorHandler");
const adminRoutes = require("./routes/adminRoutes")
dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
  res.send('Ticket Management API');
});
// user routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// admin routes
app.use('/api/admin', adminRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
