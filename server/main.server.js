require('dotenv').config();

const { aRouter, bRouter } = require('./src/app');
const express = require('express');
const cookieParser = require('cookie-parser');

let port = process.env.PORT || 3000;

const app = express();


app.use(cookieParser(process.env.SECRATE));
app.use('/xtServer/api', aRouter);
app.use('/xtServer/api', bRouter);



app.listen(port, () => {
    console.log(`the server running on ${port}, 
        press ctrl+c to terminate `);
})

