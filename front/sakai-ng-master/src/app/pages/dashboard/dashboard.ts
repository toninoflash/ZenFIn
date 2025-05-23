import { Component, OnInit } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { UserService } from '../../core/services/users/users.service';
import { Dialog } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';
import { BaseServiceService } from '../../core/services/base-service.service';
import { environment } from '../../../enviroments/environment';
const endpoint: any = environment.baseUrlSpring;

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget, Dialog, CommonModule, Tag],
    providers: [UserService],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" [dataSource] = "movements"/>
            <div class="col-span-12 xl:col-span-6">
                <app-recent-sales-widget [products]="movements" [cols]="cols" (viewEmitter)="viewModal($event)" />
                <app-best-selling-widget />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-revenue-stream-widget />
                <app-notifications-widget />
            </div>
        </div>
        <p-dialog [(visible)]="visibleView" header="Detalles del Movimiento" [modal]="true">
            <ng-template #content>
                <div class="p-4">
                    <!-- Grid de detalles -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Columna Izquierda -->
                        <div class="space-y-3">
                            <div>
                                <span class="font-semibold">Nombre:</span>
                                <span class="ml-2">{{ product.name }}</span>
                            </div>
                            <div>
                                <p-tag [severity]="product.type === 'Ingreso' ? 'primary' : product.type === 'Gasto' ? 'danger' : 'warn'" [value]="product.type"></p-tag>
                            </div>
                        </div>

                        <!-- Columna Derecha -->
                        <div class="space-y-3">
                            <div>
                                <span class="font-semibold">Fecha:</span>
                                <span class="ml-2">{{ product.createdAt | date: 'dd/MM/yyyy HH:mm' }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Cuota:</span>
                                <span class="ml-2 text-primary">{{ product.cuota | currency: product.currency }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Sección de fechas -->
                    <div class="mt-6 border-t pt-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span class="font-semibold">Cuenta:</span>
                                <span class="ml-2">{{ product.aid }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ng-template>
        </p-dialog>
    `
})
export class Dashboard implements OnInit {
    userLogin: any;
    movements: any[] = [];
    cols: any;
    product: any;
    visibleView = false;

    constructor(
        private userService: UserService,
        private baseService: BaseServiceService
    ) {}
    ngOnInit(): void {
       if (sessionStorage.getItem('us')) {
            const storedUser = sessionStorage.getItem('us');
            this.userLogin = storedUser ? JSON.parse(storedUser) : null;
        } else {
            this.userLogin = this.userService.user;
        }
        this.movements = this.userLogin.movements;
        this.cols = [
            { field: 'name', header: 'Asunto' },
            { field: 'type', header: 'Tipo', pipe: 'primary' },
            { field: 'cuota', header: 'Cuota', pipe: 'currency' },
            { field: 'createdAt', header: 'Fecha', pipe: 'date' }
        ];
    }
    viewModal(event: any) {
        this.product = event;
        const url = endpoint + 'account/' + event.aid;
        this.baseService.getItems(url).subscribe((resp: any) => {
            this.product.aid = resp.iban;
            this.visibleView = true;

        });
    }
}
