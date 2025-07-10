import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import router from './routes/pageroute.js';

// config for app 
const app = express();
const port = process.env.PORT || 4000;

// DB + Cloudinary Connect
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/pages', router); 


app.get('/', (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log("✅ Server started on port: " + port));
