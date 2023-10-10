const connectToMongo = require('./db')

const express = require('express');
const app = express();
const port = 5001;

app.get('/',(req,res)=>{
    res.send('Hello Login');
})



app.listen(port, ()=>{
    console.log(`We are listening at Port : ${port}`)
})
connectToMongo();