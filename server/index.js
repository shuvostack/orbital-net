const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Config load
dotenv.config();

// DB Connection call
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes import & use
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

// If no routes match
app.use(notFound);
// If error
app.use(errorHandler);

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running for Orbital Net...');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});