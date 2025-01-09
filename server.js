const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const logbookRoutes = require('./routes/logbookRoutes');

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS ,  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,    
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', logbookRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
