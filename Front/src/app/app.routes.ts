import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () =>
            import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./pages/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./pages/about/about.component').then((m) => m.AboutComponent),
    },
    {
        path: 'results',
        loadComponent: () =>
            import('./pages/results/results.component').then((m) => m.ResultsComponent),
    },
    {
        path: 'chat',
        loadComponent: () =>
            import('./pages/chat-room/chat-room.component').then((m) => m.ChatRoomComponent),
    },
    {
        path: 'mayor-menor',
        loadComponent: () =>
            import('./pages/mayor-menor-page/mayor-menor-page.component').then(
                (m) => m.MayorMenorPageComponent
            ),
    },
    {
        path: 'ahorcado',
        loadComponent: () =>
            import('./pages/ahorcado-page/ahorcado-page.component').then(
                (m) => m.AhorcadoPageComponent
            ),
    },
    {
        path: 'preguntados',
        loadComponent: () =>
            import('./pages/preguntados-page/preguntados-page.component').then(
                (m) => m.PreguntadosPageComponent
            ),
    },
    { path: '**', redirectTo: 'home' },
];


