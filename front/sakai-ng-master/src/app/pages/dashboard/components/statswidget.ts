import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../../core/pipes/number-formt';
import { Constans } from '../../../core/consts';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule, NumberFormatPipe],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Balance</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ balance | numberFormat }} €</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-chart-line text-orange-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">24 new </span>
                <span class="text-muted-color">since last visit</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Ingresos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ income | numberFormat }} €</div>
                    </div>
                    <div class="flex items-center justify-center bg-primary-200 dark:bg-primary-200/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-primary-500  !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">%52+ </span>
                <span class="text-muted-color">since last week</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Gastos</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ bill | numberFormat }} €</div>
                    </div>
                    <div class="flex items-center justify-center bg-primary-200 dark:bg-primary-200/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-primary-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">520 </span>
                <span class="text-muted-color">newly registered</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Ahorros</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ piggi | numberFormat }} €</div>
                    </div>
                    <div class="flex items-center justify-center bg-primary-200 dark:bg-primary-200/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-wallet text-primary-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">85 </span>
                <span class="text-muted-color">responded</span>
            </div>
        </div>`
})
export class StatsWidget implements OnInit {
    @Input() dataSource: any[] = [];
    @Input() dataSourceBuackup: any[] = [];
    private _selectedDate: any;

    @Input()
    set selectedDate(value: any) {
        this._selectedDate = value;
        this.setInvoice(); // Método que quieres ejecutar
    }

    get selectedDate(): any {
        return this._selectedDate;
    }
    @Output() movementChange: EventEmitter<any> = new EventEmitter<any>();
    month: any[] = Constans.MONTHS;
    income: any;
    bill: any;
    piggi: any;
    balance: any;
    constructor() {}
    ngOnInit(): void {
        this.setInvoice();
    }
    getMonthIndex(month: number): string {
        const foundMonth = this.month.find((m) => m.value === month);
        return foundMonth?.label;
    }
    setInvoice() {
        const dataSoruceByMonth: any[] = this.dataSource.filter((movement) => {
            const movementMonth = new Date(movement.createdAt).getMonth() + 1; // Ajuste para que enero sea 1
            return movementMonth === this.selectedDate;
        });
        this.income = dataSoruceByMonth
            .filter((movement) => movement.type === 'Ingreso') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
        this.bill = dataSoruceByMonth
            .filter((movement) => movement.type !== 'Ingreso' && movement.type !== 'Ahorro') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
        this.piggi = dataSoruceByMonth
            .filter((movement) => movement.type === 'Ahorro') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
        this.balance = this.income - this.bill - this.piggi;
        this.movementChange.emit(dataSoruceByMonth);
    }
}
