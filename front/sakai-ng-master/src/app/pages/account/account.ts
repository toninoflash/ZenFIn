import { BaseServiceService } from './../../core/services/base-service.service';
import { UserService } from './../../core/services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { AppLayout } from '../../layout/component/app.list';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { environment } from '../../../enviroments/environment';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
const endpoint: any = environment.baseUrlSpring;
@Component({
    selector: 'app-account',
    imports: [AppLayout, Dialog, Button, FloatLabelModule, InputTextModule, FormsModule, ReactiveFormsModule, Select],
    template: ` <app-list [title]="title" [dataSource]="accounts" (visibleEmitter)="visibilityModal()" (viewEmitter)="viewAccount($event)"></app-list>
        <p-dialog header="Cuenta" [modal]="true" [(visible)]="visible" [maximizable]="true">
            <form [formGroup]="formGroup" class="flex items-center gap-4 mb-4">
                <p-floatlabel>
                    <p-select formControlName="type" [options]="stateOptions" optionLabel="name" class="w-full md:w-56" appendTo="body" />
                    <label for="username">Tipo</label>
                </p-floatlabel>
                <p-floatlabel>
                    <input id="username" pInputText formControlName="iban" />
                    <label for="username">Iban</label>
                </p-floatlabel>
            </form>
            <div class="flex justify-end gap-2">
                <p-button label="Cancelar" severity="secondary" (click)="visible = false" />
                <p-button label="Aceptar" (click)="create()" [loading]="spinner" [loadingIcon]="'pi pi-spinner'" />
            </div>
        </p-dialog>`
})
export class Account implements OnInit {
    title = 'Cuentas';
    userLogin: any;
    accounts: any[] = [];
    visible = false;
    stateOptions: any[] = [];
    formGroup!: FormGroup;
    spinner: boolean = false;
    constructor(
        private userService: UserService,
        private baseService: BaseServiceService,
        private router: Router
    ) {}
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this.userService.userChange.pipe(takeUntil(this.destroy$)).subscribe((user) => {
            if (user) {
                this.userLogin = user;
            } else {
                const storedUser = sessionStorage.getItem('us');
                this.userLogin = storedUser ? JSON.parse(storedUser) : null;
            }
            this.accounts = this.userLogin?.account || [];

            this.stateOptions = [
                { name: 'Cuenta corriente', code: 'NY' },
                { name: 'Cuenta crédito', code: 'RM' }
            ];

            this.formGroup = new FormGroup({
                type: new FormControl<any | null>(null),
                iban: new FormControl<any | null>(null)
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    visibilityModal() {
        this.visible = true;
    }
    viewAccount(event: any) {
        this.router.navigate([`/account/${event}`]);
    }
    create() {
        const data: any = this.formGroup.value;
        data.uid = this.userLogin.id;
        data.type = data.type.name;
        data.balance = 0;
        data.currency = 'EUR';
        const url = endpoint + 'account';
        this.spinner = true;
        this.baseService.postItem(url, data).subscribe((resp: any) => {
            this.accounts.push(resp);
            this.userLogin.account = this.accounts;
            this.userService.user = this.userLogin;
            this.visible = false;
            this.spinner = false;
        });
    }
}
