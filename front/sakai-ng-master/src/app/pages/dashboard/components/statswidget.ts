import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../../core/pipes/number-formt';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule, NumberFormatPipe],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Balance</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{balance | numberFormat}} €</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-chart-line text-blue-500 !text-xl"></i>
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
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{income | numberFormat}} €</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-orange-500 !text-xl"></i>
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
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{bill | numberFormat}} €</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-cyan-500 !text-xl"></i>
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
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{piggi | numberFormat}} €</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-wallet text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">85 </span>
                <span class="text-muted-color">responded</span>
            </div>
        </div>`
})
export class StatsWidget implements OnInit{

    @Input() dataSource:any[] = [];

    income: any;
    bill: any;
    piggi: any;
    balance:any
ngOnInit(): void {
        this.setInvoice();
    }
    setInvoice() {
        this.income = this.dataSource
            .filter((movement) => movement.type === 'Ingreso') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
        this.bill = this.dataSource
            .filter((movement) => movement.type === 'Gasto') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
        this.piggi = this.dataSource
            .filter((movement) => movement.type === 'Ahorro') // Filtra solo los ingresos
            .reduce((sum, movement) => sum + movement.cuota, 0);
        this.balance = this.income - this.bill - this.piggi
    }
}
