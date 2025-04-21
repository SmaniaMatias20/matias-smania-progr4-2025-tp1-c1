import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AboutComponent } from './pages/about/about.component';
import { ResultsComponent } from './pages/results/results.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { MayorMenorPageComponent } from './pages/mayor-menor-page/mayor-menor-page.component';
import { AhorcadoPageComponent } from './pages/ahorcado-page/ahorcado-page.component';
import { PreguntadosPageComponent } from './pages/preguntados-page/preguntados-page.component';

export const routes: Routes = [
    { path: 'login', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'chat', component: ChatRoomComponent },
    { path: 'mayor-menor', component: MayorMenorPageComponent },
    { path: 'ahorcado', component: AhorcadoPageComponent },
    { path: 'preguntados', component: PreguntadosPageComponent },
];


