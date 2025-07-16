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
import { TableModule } from 'primeng/table';
const endpoint: any = environment.baseUrlSpring;

@Component({
    standalone: true,
    selector: 'app-listtable',
    imports: [CommonModule, ButtonModule, MenuModule, NumberFormatPipe, ChartModule, AccordionModule, TableModule],

    template: `
        <div class="card">
            <h4 class="font-medium mb-2">Detalle de pagos</h4>
            <p-table [value]="this.simulationResult" [paginator]="true" [rows]="5" styleClass="p-datatable-sm">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Mes</th>
                        <th>Capital</th>
                        <th>Interés</th>
                        <th>Saldo</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-item>
                    <tr>
                        <td>{{ item.month }}</td>
                        <!-- Usar item.month en lugar del índice -->
                        <td>{{ item.principal | numberFormat }}€</td>
                        <td>{{ item.interest | numberFormat }}€</td>
                        <td>{{ item.balance | numberFormat }}€</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class List implements OnInit {
    menu = null;
    @Input() credit: any;
    @Input() cols: any;
    simulationResult: any = null;

    constructor(
        private cd: ChangeDetectorRef,
        public layoutService: LayoutService,
        private baseService: BaseServiceService
    ) {}

    ngOnInit() {
        // this.setInvoice();
        // this.initChart();
        this.cols = [
            { field: 'name', header: 'Asunto' },
            { field: 'type', header: 'Tipo', pipe: 'primary' },
            { field: 'cuota', header: 'Cuota', pipe: 'currency' },
            { field: 'createdAt', header: 'Fecha', pipe: 'date' }
        ];
        this.simulationResult = this.generateAmortizationSchedule();
    }

    private generateAmortizationSchedule() {
        const schedule = [];
        let balance = this.credit.totalAmount; // Monto inicial del préstamo

        for (let month = 1; month <= this.credit.term; month++) {
            const interest = balance * (this.credit.interestRate / 100 / 12);
            const principal = this.credit.monthlyPayment - interest;
            balance -= principal;

            schedule.push({
                month: month, // Número de mes correcto (1, 2, 3...)
                principal: principal,
                interest: interest,
                balance: balance > 0 ? balance : 0 // Evitar saldos negativos
            });
        }

        return schedule;
    }
}
