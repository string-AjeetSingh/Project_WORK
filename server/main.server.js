require('dotenv').config();

const { aRouter, bRouter } = require('./src/app');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

let port = process.env.PORT || 3000;

const app = express();


app.use(cookieParser(process.env.SECRATE));
app.use('/xtServer/api', aRouter);
app.use('/xtServer/api', bRouter);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.listen(port, () => {
    console.log(`the server running on ${port}, 
        press ctrl+c to terminate `);
})

