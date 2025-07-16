import { ChangeDetectorRef, Component, effect, inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { NumberFormatPipe } from '../../../core/pipes/number-formt';
import { RecentSalesWidget } from '../../dashboard/components/recentsaleswidget';
import { AppConfigService } from '../../../core/services/appconfigservice';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../../../layout/service/layout.service';
import { debounceTime, Subscription } from 'rxjs';
import { environment } from '../../../../enviroments/environment';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { Dialog } from 'primeng/dialog';
import { Tag } from 'primeng/tag';
import { CustomDatePipe } from '../../../core/pipes/custom-date-pipe';
import { AccordionModule } from 'primeng/accordion';
import { Utils } from '../../../core/utils';
const endpoint: any = environment.baseUrlSpring;

@Component({
    standalone: true,
    selector: 'app-topcredit',
    imports: [CommonModule, ButtonModule, MenuModule, NumberFormatPipe, ChartModule, Dialog, Tag, CustomDatePipe, AccordionModule],

    template: `
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
                                <span class="ml-2">{{ product.createdAt | customDate }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Cuota:</span>
                                <span class="ml-2 text-primary">{{ product.cuota | numberFormat }}</span>
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

        <div class="">
            <!-- Page title and controls -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h1 class="text-2xl font-bold mb-4 md:mb-0">{{ data.type }} de {{ data.totalAmount | numberFormat }}</h1>
            </div>

            <!-- Summary cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div class="card p-4 rounded-lg shadow-sm border-l-4 border-primary-500">
                    <div class="text-sm text-gray-500 mb-1">Importe pendiente</div>
                    <div class="text-xl font-semibold">{{data.totalAmountPending | numberFormat}} €</div>
                </div>
                <div class="card p-4 rounded-lg shadow-sm border-l-4 border-primary-500">
                    <div class="text-sm text-gray-500 mb-1">Cuota a pagar</div>
                    <div class="text-lg font-semibold">{{ data.monthlyPayment | numberFormat }} €</div>
                </div>
                <div class="card p-4 rounded-lg shadow-sm border-l-4 border-primary-500">
                    <div class="text-sm text-gray-500 mb-1">Fecha de vencimiento</div>
                    <div class="text-lg font-semibold">{{ data.endDate | customDate }}</div>
                </div>
                <div class="card p-4 rounded-lg shadow-sm border-l-4 border-primary-500">
                    <div class="text-sm text-gray-500 mb-1">Recibos pendientes de vencer</div>
                    <div class="text-lg font-semibold">{{data.termPending}}</div>
                </div>
            </div>

            <!-- Loan details accordion -->
            <div class="mb-8">
                <div class="accordion">
                    <p-accordion value="">
                        <p-accordion-panel value="0">
                            <p-accordion-header>Detalle del préstamo</p-accordion-header>
                            <p-accordion-content>
                                <div class="relative rounded-lg ">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <!-- Column 1 -->
                                        <div>
                                            <div class="mb-4">
                                                <label class="block text-sm text-gray-500 mb-1">Tipo de préstamo</label>
                                                <div class="font-medium">{{ data.type }}</div>
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-sm text-gray-500 mb-1">Cuenta vinculada</label>
                                                <div class="font-medium">{{accountIban}}</div>
                                            </div>
                                        </div>

                                        <!-- Column 2 -->
                                        <div>
                                            <div class="mb-4">
                                                <label class="block text-sm text-gray-500 mb-1">Titulares</label>
                                                <div class="font-medium">{{ userLogin.name }} {{ userLogin.lastname }}</div>
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-sm text-gray-500 mb-1">Fecha constitución</label>
                                                <div class="font-medium">{{ data.createdAt | customDate }}</div>
                                            </div>
                                        </div>

                                        <!-- Column 3 -->
                                        <div>
                                            <div class="mb-4">
                                                <label class="block text-sm text-gray-500 mb-1">Importe interés</label>
                                                <div class="font-medium">{{ data.totalInterest | numberFormat }} €</div>
                                            </div>
                                            <div class="mb-4">
                                                <label class="block text-sm text-gray-500 mb-1">Tipo de interés</label>
                                                <div class="font-medium">{{ data.term }}%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </p-accordion-content>
                        </p-accordion-panel>
                    </p-accordion>
                </div>
            </div>
        </div>
    `
})
export class Topcredit implements OnInit, OnChanges {
    menu = null;
    @Input() data: any;
    @Input() movements: any[] = [];
    @Input() type: boolean = false;
    @Input() userLogin: any;
    accountIban: any;
    cols: any;
    options: any;
    chartData: any;
    income: any;
    bill: any;
    piggi: any;
    platformId = inject(PLATFORM_ID);

    configService = inject(AppConfigService);
    subscription!: Subscription;

    product: any;
    visibleView = false;
    constructor(
        private cd: ChangeDetectorRef,
        public layoutService: LayoutService,
        private baseService: BaseServiceService
    ) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initChart();
        });
    }

    themeEffect = effect(() => {
        if (this.configService.transitionComplete()) {
            this.initChart();
        }
    });

    ngOnInit() {
        // this.setInvoice();
        // this.initChart();
console.log("DATA: "+this.data.name);
        this.cols = [
            { field: 'name', header: 'Asunto' },
            { field: 'type', header: 'Tipo', pipe: 'primary' },
            { field: 'cuota', header: 'Cuota', pipe: 'currency' },
            { field: 'createdAt', header: 'Fecha', pipe: 'date' }
        ];
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.setInvoice();
        this.initChart();
        this.viewAccount();
    }
    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.chartData = {
            labels: ['Ingresos', 'Gastos', 'Ahorros'],
            datasets: [
                {
                    data: [this.income, this.bill, this.piggi],
                    backgroundColor: [documentStyle.getPropertyValue('--p-primary-400'), documentStyle.getPropertyValue('--p-primary-600'), documentStyle.getPropertyValue('--p-primary-800')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--p-primary-500'), documentStyle.getPropertyValue('--p-primary-700'), documentStyle.getPropertyValue('--p-primary-900')],
                    borderColor: [documentStyle.getPropertyValue('--p-primary-400'), documentStyle.getPropertyValue('--p-primary-600'), documentStyle.getPropertyValue('--p-primary-800')]
                }
            ]
        };

        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
        this.cd.markForCheck();
    }

    viewModal(event: any) {
        this.product = event;
        const url = endpoint + 'account/' + event.aid;
        this.baseService.getItems(url).subscribe((resp: any) => {
            this.product.aid = resp.iban;
            this.visibleView = true;
        });
    }

    setInvoice() {
        this.income = this.movements
            .filter((movement) => movement.type === 'Ingreso') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
        this.bill = this.movements
            .filter((movement) => movement.type === 'Gasto') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
        this.piggi = this.movements
            .filter((movement) => movement.type === 'Ahorro') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
    }

    getAmountPending() {
        return (Utils.getMonthsBetweenDates(new Date(), new Date(this.data.endDate)) * this.data.monthlyPayment).toFixed(2);
    }
    getMonthsPending() {
        return Utils.getMonthsBetweenDates(new Date(), new Date(this.data.endDate));
    }
    viewAccount() {
        const url = endpoint + 'account/' + this.data.aid;
        this.baseService.getItems(url).subscribe((resp: any) => {
            this.accountIban = resp.iban;

        });
    }
}
