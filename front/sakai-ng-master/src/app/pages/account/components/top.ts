import { ChangeDetectorRef, Component, effect, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { NumberFormatPipe } from '../../../core/pipes/number-formt';
import { RecentSalesWidget } from '../../dashboard/components/recentsaleswidget';
import { AppConfigService } from '../../../core/services/appconfigservice';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../../../layout/service/layout.service';
import { debounceTime, Subscription } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-top',
    imports: [CommonModule, ButtonModule, MenuModule, NumberFormatPipe, RecentSalesWidget, ChartModule],

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
                <p-chart type="doughnut" [data]="chartData " [options]="options" class="w-full md:w-[30rem]" />
            </div>
        </div>
        <div class="md:w-1/2">
            <div class="flex flex-col gap-4">
                <app-recent-sales-widget />
            </div>
        </div>
    </div>`
})
export class Top implements OnInit {
    menu = null;
    @Input() data: any;
    options: any;
chartData :any
    platformId = inject(PLATFORM_ID);

    configService = inject(AppConfigService);
    subscription!: Subscription;

    constructor(private cd: ChangeDetectorRef,public layoutService: LayoutService) {
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
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

            this.chartData  = {
                labels: ['Ingresos', 'Gastos', 'Ahorros'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [documentStyle.getPropertyValue('--p-primary-400'), documentStyle.getPropertyValue('--p-primary-600'), documentStyle.getPropertyValue('--p-primary-800')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--p-primary-500'), documentStyle.getPropertyValue('--p-primary-700'), documentStyle.getPropertyValue('--p-primary-900')],
                        borderColor:[documentStyle.getPropertyValue('--p-primary-400'), documentStyle.getPropertyValue('--p-primary-600'), documentStyle.getPropertyValue('--p-primary-800')],
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
            this.cd.markForCheck()
    }
}
