const express = require('express');
const app = express();
const port = 5001;

const connectToMongo = require('./db');
// Connect to MongoDB
connectToMongo();
// Routes
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
// const notesRoutes = require('./routes/notes');

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/', (req, res) => {
    res.send('Hello Login');
});

app.use('/api/auth', authRoutes);
app.use('/api/notes',notesRoutes)
// app.use('/api/notes', notesRoutes);

app.listen(port, () => {
    console.log(`Server is not listening on port ${port}`);
});


