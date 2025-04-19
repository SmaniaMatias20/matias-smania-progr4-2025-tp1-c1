import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AboutComponent } from './pages/about/about.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'chat', component: ChatRoomComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "**", redirectTo: "error", pathMatch: "full" },
];


