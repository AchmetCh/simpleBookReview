const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const connection = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')

dotenv.config();
const port = 8000;
const app = express();
app.use(express.json());

app.options('*', cors())
app.use(cors({
  origin: '*', // Allow multiple origins
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Enable credentials if needed
  optionsSuccessStatus: 200
}));

app.use('/user', authRoutes)
app.use('/book', bookRoutes)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});