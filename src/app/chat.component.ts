import { Component, OnInit } from '@angular/core';
import { SignalRService } from './signalr.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  user: string;
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  imports: [FormsModule, CommonModule],
})

export class ChatComponent implements OnInit {
  user: string = '';
  message: string = '';
  messages: Message[] = [];

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    
    this.signalRService.startConnection();
    this.signalRService.addMessageListener();

    // This call the method specified after 2 sec. However, this can be better done using an observable.
    // setTimeout(() => {
    //   this.signalRService.addMessageListener();
    // }, 2000);
  }

  sendMessage(user: string, message: string): void {
    this.signalRService.sendMessage(user, message);
  }
}
