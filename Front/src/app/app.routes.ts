import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';  // Importamos el AuthComponent

export const routes: Routes = [
    { path: 'login', component: AuthComponent }, // Ruta para login
    { path: 'home', component: HomeComponent },   // Ruta para home
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login al iniciar
    { path: "**", redirectTo: "error", pathMatch: "full" },
];


