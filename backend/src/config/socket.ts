import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { verifyAccessToken } from '../shared/utils/jwt';
import { logger } from '../middlewares/logger';

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      const decoded = verifyAccessToken(token) as any;
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`Client connected to socket: ${socket.id} (User ID: ${socket.data.user.id})`);

    // Join a room specific to the user for private notifications
    socket.join(socket.data.user.id);

    // Join a room based on role (e.g. all admins)
    if (socket.data.user.role) {
      socket.join(`role:${socket.data.user.role}`);
    }

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
