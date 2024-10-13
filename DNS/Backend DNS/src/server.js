const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const dnsRoutes = require('./routes/dnsRoutes');
app.use('/api/dns', dnsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));