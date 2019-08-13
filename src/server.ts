import * as http from 'http';
import App from './app-server';
import * as socketIo from 'socket.io';
import { Emit } from './interfaces/emit';

export class Server{
  private port;
  private server;
  constructor(){
    this.port = this.normalizePort(process.env.PORT || 3000);
    App.set('port', this.port);
    this.server = http.createServer(App);
    this.configSocket();
    this.server.listen(this.port)
    .on('error', this.onError)
    .on('listening', () =>{
      this.onListening(this.server);
    });
  }
  configSocket(){
    const io = socketIo(this.server);
    io.on('connect', (socket: any) => {
      socket.on('eventDB',(emit:Emit)=>{
        io.emit('eventDB',emit)
      });
    });
  }
  normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }
  onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    const port = this.normalizePort(process.env.PORT || 3000);
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch(error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  onListening(server): void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`listening on ${bind}`);
  }
} 
const srv = new Server();

