require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/Users');
const bookRoutes = require('./routes/Books');

const app = express();
connectDB();

app.use(cors({
  origin: ["http://localhost:5173" , 'https://day-thirteen-1.onrender.com'],
  credentials: true
}));

app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
