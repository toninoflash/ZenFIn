import { UserService } from './../../core/services/users/users.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { BaseServiceService } from '../../core/services/base-service.service';
import { MenuItem, MessageService } from 'primeng/api';
import { environment } from '../../../enviroments/environment';
import { User } from '../../core/models/user';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { Textarea } from 'primeng/textarea';
const endpoint: any = environment.baseUrlSpring + 'users';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, MenuModule, ReactiveFormsModule, CommonModule, Textarea],
    providers: [UserService, BaseServiceService, MessageService],
    template: `
        <div class="card   rounded-2xl shadow-md">
            <div class="flex items-start space-x-6">
                <!-- Avatar -->
                <img [src]="userLogin.avatarUrl" alt="avatar" class="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm" />

                <!-- Info básica -->
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <div>
                            <h2 class="text-2xl font-semibold text-primary">{{ userLogin.name }} {{ userLogin.lastname }}</h2>
                            <p class="">{{ userLogin.bio }}</p>
                        </div>
                        <div>
                            <p-button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain" (onClick)="menu.toggle($event)"> </p-button>
                            <p-menu #menu [popup]="true" [model]="menuItems" class="menu-left"></p-menu>
                        </div>
                    </div>

                    <div class="mt-4 text-sm space-y-1" *ngIf="!editando">
                        <p><strong>Email:</strong> {{ userLogin.email }}</p>
                        <p><strong>Teléfono:</strong> {{ userLogin.phone }}</p>
                        <p>
                            <strong>Web: </strong> <a [href]="'https://' + userLogin.website" target="_blank" class="text-blue-600 hover:underline">{{ userLogin.website }}</a>
                        </p>
                        <p><strong>Dirección:</strong> {{ userLogin.direction }}</p>
                        <p><strong>Miembro desde:</strong> {{ userLogin.createdAt }}</p>
                    </div>

                    <!-- Formulario de edición -->
                    <form *ngIf="editando" [formGroup]="profileForm" (ngSubmit)="guardarCambios()" class="mt-4 space-y-3">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" pInputText formControlName="name" placeholder="Nombre" class="w-full" />
                            <input type="text" pInputText formControlName="lastname" placeholder="Apellidos" class="w-full" />
                            <input type="email" pInputText formControlName="email" placeholder="Email" class="w-full" />
                            <input type="text" pInputText formControlName="phone" placeholder="Teléfono" class="w-full" />
                            <input type="text" pInputText formControlName="website" placeholder="Sitio web" class="w-full" />
                            <input type="text" pInputText formControlName="direction" placeholder="Dirección" class="w-full" />
                        </div>
                        <textarea pInputTextarea formControlName="bio" rows="3" placeholder="Biografía" class="w-full"></textarea>

                        <div class="flex justify-end space-x-2">
                            <button type="button" pButton label="Cancelar" class="p-button-secondary" (click)="editando = false"></button>
                            <button type="submit" pButton label="Guardar" icon="pi pi-check"  [loading]="spinner" [loadingIcon]="'pi pi-spinner'"></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .p-menu {
                left: auto !important;
                right: 0 !important;
            }
        `
    ]
})
export class Profile {
    menuItems: MenuItem[] = [];
    userLogin!: any;

    editando = false;
    spinner = false;
    profileForm!: FormGroup;
    constructor(
        private userService: UserService,
        private baseService: BaseServiceService,
        private router: Router,
        private fb: FormBuilder
    ) {}
    ngOnInit() {
        if (this.userService.user) {
            this.userLogin = this.userService.user;
        } else {
            this.userLogin = JSON.parse(sessionStorage.getItem('us')!);
        }
        this.menuItems = [
            { label: 'Editar perfil', icon: 'pi pi-user-edit', command: () => this.toggleEditar() },
            { label: 'Ver sitio web', icon: 'pi pi-globe', command: () => window.open('https://' + this.userLogin.website, '_blank') },
            { separator: true },
            { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
        ];
        this.profileForm = this.fb.group({
            name: [this.userLogin.name],
            lastname: [this.userLogin.lastname],
            email: [this.userLogin.email],
            phone: [this.userLogin.phone],
            website: [this.userLogin.website],
            direction: [this.userLogin.direction],
            bio: [this.userLogin.bio]
        });
    }

    toggleEditar() {
        this.editando = !this.editando;
        if (this.editando) {
            this.profileForm.patchValue(this.userLogin); // Recargar datos por si hubo cambios
        }
    }

    guardarCambios() {
        if (this.profileForm.valid) {
            this.spinner=true
            let user;
            user = { ...this.userLogin, ...this.profileForm.value };
            user.account = null;
            user.product = null;
            const account = this.userService
            const url = endpoint + '/' + this.userLogin.id;
            this.baseService.putItem(url, user).subscribe((resp: any) => {
                user = resp;
                user.account = this.userLogin.account;
                user.product = this.userLogin.product
                this.userService.user = user;
                this.userLogin = this.userService.user;
                this.editando = false;
            this.spinner=false

            });
            // Aquí llamarías a tu servicio backend para guardar
        }
    }

    irAConfiguracion() {
        console.log('Configuración');
    }

    logout() {
        sessionStorage.clear();
        this.userService.user = null;
        this.router.navigate(['/login']);
    }
}
