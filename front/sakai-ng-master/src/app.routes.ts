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
import { Profile } from './app/pages/profile/profile';
import { Simulator } from './app/layout/component/app.simulator';
import { Register } from './app/pages/auth/register';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: Dashboard ,canActivate: [AuthGuard],},
            { path: 'account', loadChildren: () => import('./app/pages/account/account.routes') },
            { path: 'product', component: ProductPage ,canActivate: [AuthGuard],},
            { path: 'administration', component: Crud,canActivate: [AuthGuard] },
            { path: 'credit', loadChildren: () => import('./app/pages/credit/credit.routes') },
            { path: 'piggy', component: Piggy,canActivate: [AuthGuard] },
            { path: 'profile', component: Profile,canActivate: [AuthGuard] },
            { path: 'simulator', component: Simulator,canActivate: [AuthGuard] },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'login', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: 'confirm-registration', component: Register },
    { path: 'notfound', component: Notfound },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/notfound' },


];
