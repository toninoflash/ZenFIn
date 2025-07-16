import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';
import { Login } from './login';
import { Register } from './register';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'register', component: Register },

    { path: '', component: Login }
] as Routes;
