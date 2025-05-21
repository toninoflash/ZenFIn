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
const endpoint: any = environment.baseUrlSpring;

@Component({
    standalone: true,
    selector: 'app-top',
    imports: [CommonModule, ButtonModule, MenuModule, NumberFormatPipe, RecentSalesWidget, ChartModule, Dialog, Tag, CustomDatePipe],

    template: ` <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card flex flex-col sm:flex-row sm:items-center p-6 gap-4">
                    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                        <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                            <div>
                                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ data.type }}</span>
                                <div class="text-2xl font-medium mt-2 text-primary hover:text-primary-300 cursor-pointer">{{ data.iban }}</div>
                            </div>
                        </div>
                        <div class="flex flex-col md:items-end gap-2">
                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">Saldo disponible</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <p-button icon="pi pi-euro" [label]="data.balance | numberFormat" [disabled]="data.inventoryStatus === 'OUTOFSTOCK'" styleClass="flex-auto md:flex-initial whitespace-nowrap "></p-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card flex flex-col sm:flex-row sm:items-center p-6 gap-4  justify-center">
                    <p-chart type="doughnut" [data]="chartData" [options]="options" class="w-full md:w-[30rem]" />
                </div>
            </div>
            <div class="md:w-1/2">
                <div class="flex flex-col gap-4">
                    <app-recent-sales-widget [products]="movements" [cols]="cols" (viewEmitter)="viewModal($event)" />
                </div>
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
        </p-dialog>`
})
export class Top implements OnInit, OnChanges {
    menu = null;
    @Input() data: any;
    @Input() movements: any[] = [];
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
        this.setInvoice();
        this.initChart();
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
}
