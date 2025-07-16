import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Cuentas y productos',
                items: [
                    { label: 'Mis finanzas', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard'] },
                    { label: 'Cuentas', icon: 'pi pi-fw pi-wallet ', routerLink: ['/account'] },

                    { label: 'Productos', icon: 'pi pi-fw pi-box ', routerLink: ['/product'] },

                    {
                        label: 'Ingresos y gastos',
                        icon: 'pi pi-fw pi-money-bill',
                        items: [{ label: 'Administrar', icon: 'pi pi-fw pi-bookmark', routerLink: ['/administration'] }]
                    },
                ]
            },
            {
                label: 'Prestamos e Hipotecas',
                items: [
                    { label: 'Mis prestamos e hipotecas', icon: 'pi pi-fw pi-home', routerLink: ['/credit'] },
                    {
                        label: 'Simular',
                        icon: 'pi pi-fw pi-credit-card',
                        routerLink: ['/simulator']

                    },
                ]
            },
            {
                label: 'Ahorro e inversiones',
                items: [
                    { label: 'Mis huchas e inversiones', icon: 'pi pi-fw pi-home', routerLink: ['/piggy'] },
                    {
                        label: 'Huchas',
                        icon: 'pi pi-fw pi-check-square',
                        items: [
                            { label: 'Abrir', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Inversiones',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Simular', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    }
                ]
            },
        ];
    }
}
