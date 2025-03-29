const express = require('express')
const app = express()
const PORT = 5000
const mongoDB = require("./db")

const cors = require("cors");
app.use(cors());


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Required-with, Content-Type, Accept"
    );
    next();
})
mongoDB()
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.get('/', (req, res) => {
    res.send("Hello world! ----")
})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})