import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
    
  private hubConnection!: signalR.HubConnection;

  messageReceived = new Subject<{ user: string, message: string }>();

  constructor() { }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7129/chat', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

      // this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      //   this.messageReceived.next({ user, message });
      // });
      
      this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
    }

  addMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messageReceived.next({ user, message });
      console.log(user, message);
    });
  }

  sendMessage = (user: string, message: string) => {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }
}
