import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from "socket.io";
import koko from './routes/chat.js';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth2.js'

let secret = 'secret';
mongoose.connect('mongodb://localhost/flowerShop');

const app = express();

(async () => {

  app.use(bodyParser.json({ limit: "30mb", extends: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extends: true }));
  app.use(cors({
    origin: ["http://localhost:4000"],
    credentials: true
  }));

  app.use(session({
    name: 'users.sid',         // the name of session ID cookie
    secret: secret,            // the secret for signing the session ID cookie - mandatory option
    resave: false,             // do we need to resave unchanged session? (only if touch does not work)  - mandatory option
    saveUninitialized: true,  // do we need to save an 'empty' session object? - mandatory option
    rolling: true,             // do we send the session ID cookie with each response?
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/flowerShop',
      useNewUrlParser: true,
      useUnifiedTopology: true
    }), // session storage backend
    cookie: { maxAge: 900000, httpOnly: true, sameSite: true }  // cookie parameters
    // NB: maxAge is used for session object expiry setting in the storage backend as well
  }));
  app.use(cookieParser(secret));

  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    console.log("---- Middleware ----");
    console.log(req.session);
    console.log("req.user--------");
    console.log(req.user);
    console.log("req body------");
    console.log(req.body);
    console.log("---- Middleware end ----");
    next();
  });


  //import chatRoutes from './routes/chat.js'

  
  app.use('/posts', postRoutes);
  app.use('/users', userRoutes);
  app.use('/auth', authRoutes);

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  //app.use('/chat', chatRoutes);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:4000",
      methods: ["GET", "POST","AUTH"],
      transports: ['websocket', 'polling']
    },
  });


  const onConnection = async (socket) => {
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

})()