const express = require("express");
const dotenv = require("dotenv").config();
const userRouter = require('./routes/userRoute');
const connectDB = require('./config/db');
const productRouter = require("./routes/productRoute");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.get('/',(req,res)=>{
  res.json({message:"hi"})
});

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.listen(PORT,()=>{
  console.log("server running at port", PORT);
})