import { bootstrapApplication } from '@angular/platform-browser';
//import { AppComponent } from './app/app.component';
import { ChatComponent } from './app/chat.component';
import { config } from './app/app.config.server';

//const bootstrap = () => bootstrapApplication(AppComponent, config);
const bootstrap = () => bootstrapApplication(ChatComponent, config);

export default bootstrap;
