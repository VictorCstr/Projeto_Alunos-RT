import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.websocketUrl, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });
  }

  conect() {
    this.socket.connect();
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
