import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './src/mongoconnect.js';
import router from './src/Router.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods:["GET","POST"],
  },
});

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = process.env.PORT;
httpServer.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});

/** api routes */
app.use('/api', router);


/** start server only when we have valid connection */
connect().then(() => {
  console.log('Database connected successfully');
  setupSocketIO();
}).catch(error => {
  console.log('Cannot connect to the database');
});

function setupSocketIO() {
  const onlineUsers = new Map(); // Track online users

  io.on("connection", (socket) => {
    // Add new user to online users list
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    // Handle incoming message and send to recipient
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        io.to(sendUserSocket).emit("msg-recieve", data.content);
      }
    });
  });
  
}
