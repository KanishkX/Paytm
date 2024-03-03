const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/exp");

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(3000,()=>{
    console.log("started listening: 3000");
});