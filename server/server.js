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
const allowedOrigins = (process.env.CLIENT_URL || 'https://mini-os-nu.vercel.app,http://localhost:4200')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
//tell express to read json
app.use(express.json());

app.get('/', (_req, res) => {
    res.status(200).json({ status: 'ok', service: 'mini-os-monitor-api' });
});

//Routes
app.use('/cpu',cpuRoutes);
app.use('/memory',memoryRoutes);
app.use('/processes',processRoutes);


// Server Port
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;