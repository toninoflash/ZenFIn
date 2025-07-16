import { Routes } from "@angular/router";
import { Crud } from "../crud/crud";
import { AuthGuard } from "../../core/guards/auth.guard";
import { Credit } from "./credit";
import { Creditbyid } from "./creditbyid";

export default [
    { path: '', data: { breadcrumb: 'Cuentas' }, component: Credit ,canActivate: [AuthGuard],},
    { path: ':id', data: { breadcrumb: 'Cuentas' }, component: Creditbyid , canActivate: [AuthGuard],},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
