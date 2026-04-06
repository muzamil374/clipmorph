require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});

app.post("/create-order", async (req,res)=>{
  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency:"INR"
  });
  res.json(order);
});

app.post("/verify", (req,res)=>{
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature,file} = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto.createHmac("sha256", process.env.KEY_SECRET)
    .update(body)
    .digest("hex");

  if(expected === razorpay_signature){
    res.json({success:true, download:"/download?file=" + file});
  } else {
    res.json({success:false});
  }
});

app.get("/download", (req,res)=>{
  res.download("assets/clips/" + req.query.file);
});

app.listen(5000,()=>console.log("Server running"));