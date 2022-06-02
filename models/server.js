import http from 'http';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { Server as ServerSocket } from 'socket.io';

import Sockets from './sockets.js';
import router from '../router/auth.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    this.io = new ServerSocket(this.server, {});
  }

  middlewares() {
    this.app.use(express.static('../public'));
    this.app.use(cors());
    this.app.use('/api/login', router);
  }
  configurarSockets() {
    new Sockets(this.io);
  }

  async dbConnection() {
    try {
      await mongoose.connect(process.env.MONGOBD + '/chat_socket');
      console.log('db connected success');
    } catch (error) {
      console.error(error);
      throw new Error('Error to connect with the database');
    }
  }

  execute() {
    this.middlewares();

    this.configurarSockets();

    this.dbConnection();

    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }
}

export default Server;
