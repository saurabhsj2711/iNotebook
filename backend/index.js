const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
connectToMongo();
const port = 5000;
app.use(cors());



app.get('/',(req,res)=>{
    res.send("Hello Saurabh !!") 
})

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
