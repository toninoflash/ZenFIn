import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../layout/service/layout.service';
import { BaseServiceService } from '../../../core/services/base-service.service';
import { UserService } from '../../../core/services/users/users.service';
import { environment } from '../../../../enviroments/environment';
const endpoint = environment.baseUrlSpring;

@Component({
    standalone: true,
    selector: 'app-revenue-stream-widget',
    imports: [ChartModule],
    providers: [BaseServiceService, UserService],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Revenue Stream</div>
        <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="h-80" />
    </div>`
})
export class RevenueStreamWidget {
    @Input() labels: any = ['Q1', 'Q2', 'Q3', 'Q4'];
    datasource: any = ['Q1', 'Q2', 'Q3', 'Q4'];

    @Input() selectedDate: any = 5;
    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(
        public layoutService: LayoutService,
        private baseService: BaseServiceService,
        private userService: UserService
    ) {
        this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.getDataSource();
    }
ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
              this.getDataSource();

    }
  }

    getDataSource() {
        const url: string = endpoint + 'movement/uid/' + this.userService.user?.id + '/' + this.selectedDate;
        this.baseService.getItems(url).subscribe((data: any) => {
            this.datasource = data;
            this.initChart();
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        this.chartData = {
            labels: this.labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Ingresos',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                    data: [this.datasource[3].income, this.datasource[2].income, this.datasource[1].income, this.datasource[0].income],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Gastos',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                    data: [this.datasource[3].bills, this.datasource[2].bills, this.datasource[1].bills, this.datasource[0].bills],
                    barThickness: 32
                },
                {
                    type: 'bar',
                    label: 'Ahorros',
                    backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                    data: [this.datasource[3].pigg, this.datasource[2].pigg, this.datasource[1].pigg, this.datasource[0].pigg],
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 0
                    },
                    borderSkipped: false,
                    barThickness: 32
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                        borderColor: 'transparent'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: borderColor,
                        borderColor: 'transparent',
                        drawTicks: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
