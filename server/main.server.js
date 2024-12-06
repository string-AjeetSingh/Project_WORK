require('dotenv').config();
const aRouter = require('./src/app');
const express = require('express');


let port = process.env.PORT || 3000;

const app = express();
app.use('/xtServer/api', aRouter);


app.listen(port, () => {
    console.log(`the server running on ${port}, 
        press ctrl+c to terminate `);
})

