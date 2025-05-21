import { Routes } from "@angular/router";
import { Account } from "./account";
import { Crud } from "../crud/crud";
import { Accountbyid } from "./accountbyid";
import { AuthGuard } from "../../core/guards/auth.guard";

export default [
    { path: '', data: { breadcrumb: 'Cuentas' }, component: Account ,canActivate: [AuthGuard],},
    { path: ':id', data: { breadcrumb: 'Cuentas' }, component: Accountbyid , canActivate: [AuthGuard],},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
