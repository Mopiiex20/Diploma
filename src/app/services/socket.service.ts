import * as  openSocket from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
    socket = openSocket('http://localhost:3500', { transports: ['websocket'] });


    subscribeToTimer(cb) {
        this.socket.on('timer', (timestamp) => cb(null, timestamp));
        this.socket.emit('subscribeToTimer', 1000);
    }

    $onStudentConnect = (): Observable<string> => {
        debugger
        return fromEvent(this.socket, 'onStudentConnect');
    };


}