import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log(' ----- Socket server connected! ----- ');
    console.log('A user connected: ' + socket.id);

    socket.on('sendMessage', (friendId, message) => {
      // Отправляем событие конкретному пользователю
      //console.log(` --- i got your message: ${friendId} --- `);
      io.emit('updateChat-' + friendId, message);
    });

    socket.on('disconnect', async () => {
      console.log('A user disconnected: ' + socket.id);
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
