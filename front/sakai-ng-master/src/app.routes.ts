import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/pages/auth/login';
import { AuthGuard } from './app/core/guards/auth.guard';
import { Account } from './app/pages/account/account';
import { ProductPage } from './app/pages/product/product';
import { Crud } from './app/pages/crud/crud';
import { Credit } from './app/pages/credit/credit';
import { Piggy } from './app/pages/piggy/piggy';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'account', loadChildren: () => import('./app/pages/account/account.routes') },
            { path: 'product', component: ProductPage },
            { path: 'administration', component: Crud },
            { path: 'credit', component: Credit },
            { path: 'piggy', component: Piggy },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'login', component: Login },
    { path: 'notfound', component: Notfound },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/notfound' },


];
