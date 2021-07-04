import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import cors from 'cors';
import { Server } from "socket.io";
import koko from './routes/chat.js';


const app = express(); 

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import productRoutes from './routes/products.js'
import shoppingCartRoutes from './routes/shoppingCart.js'

app.use(bodyParser.json({limit:"30mb",extends:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extends:true}));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', shoppingCartRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
const server =app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`));
//app.use('/chat', chatRoutes);
 
const io = new Server(server, {  
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling']},
  });

  import Rooms from './models/roomSchema.js';

  const onConnection = async(socket) => {
/*
    console.log("i am in onConnection function ");
    console.log("socket.id " + socket.id);
    console.log("socket.name ");
    socket.emit("your id", socket.id);
    //let roomList = await rooms.findAll();
    try { socket.emit('roomList', await Rooms.find()); }
    catch (e) { console.log("----//---" + e + "----//---"); }
*/ 
console.log("i am in onConnection function ");
console.log("socket.id " + socket.id);
console.log("socket.name ");
    koko(io, socket);   
  }
io.on("connection", onConnection);
