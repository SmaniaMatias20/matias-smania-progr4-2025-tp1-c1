import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';  // Importamos el AuthComponent
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    { path: 'login', component: AuthComponent }, // Ruta para login
    { path: 'home', component: HomeComponent },   // Ruta para home
    { path: 'about', component: AboutComponent },   // Ruta para home
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige a home al iniciar
    { path: "**", redirectTo: "error", pathMatch: "full" },
];


