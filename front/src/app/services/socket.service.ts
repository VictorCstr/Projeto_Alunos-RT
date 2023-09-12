import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io('http://localhost:9090', {
      transports: ['websocket'],
    });
  }

  sendMessage(message: string) {
    this.socket.emit('mensagem', message);
  }

  onEvent(event: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }
}
