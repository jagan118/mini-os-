//  packages importing
const express = require('express');
const cors = require('cors');

//import routes
const cpuRoutes = require('./routes/cpu');
const memoryRoutes = require('./routes/memory');
const processRoutes = require('./routes/process');


// Created an Express app
const app = express();

// Middleware sett
app.use(cors());
//tell express to read json
app.use(express.json());

//Routes
app.use('/cpu',cpuRoutes);
app.use('/memory',memoryRoutes);
app.use('/processes',processRoutes);


// Server Port
const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});