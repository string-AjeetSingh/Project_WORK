require('dotenv').config();

const aRouter = require('./src/app');
const express = require('express');
const cookieParser = require('cookie-parser');

let port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.SECRATE));
app.use('/xtServer/api', aRouter);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // Handle JWT validation errors
        return res.status(401).json({ message: 'Invalid or missing token' });
    }
    // Pass the error to the next handler if it's not related to JWT
    next(err);
});


app.listen(port, () => {
    console.log(`the server running on ${port}, 
        press ctrl+c to terminate `);
})

