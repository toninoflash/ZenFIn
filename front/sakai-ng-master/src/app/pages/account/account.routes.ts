import { Routes } from "@angular/router";
import { Account } from "./account";
import { Crud } from "../crud/crud";
import { Accountbyid } from "./accountbyid";

export default [
    { path: '', data: { breadcrumb: 'Cuentas' }, component: Account },
    { path: ':id', data: { breadcrumb: 'Cuentas' }, component: Accountbyid },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
