import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../../core/pipes/number-formt';
import { Constans } from '../../../core/consts';
import { TieredMenu } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Utils } from '../../../core/utils';
import { UserService } from '../../../core/services/users/users.service';
import { BaseServiceService } from '../../../core/services/base-service.service';

@Component({
    standalone: true,
    selector: 'app-date-top-change',
    imports: [CommonModule, MenuModule, ButtonModule],
    template: `
        <div class="col-span-12 text-right">
            <p-button [label]="getMonthIndex(selectedDate)" (click)="menu.toggle($event)" />
            <p-menu #menu [popup]="true" [model]="month">
                <ng-template #submenuheader let-item>
                    <span class="text-primary font-bold" (click)="onMonthChange(item)">{{ item.label }}</span>
                </ng-template>
            </p-menu>
        </div>
    `
})
export class DateTopChange implements OnInit {
    @Input() dataSource: any[] = [];
    @Input() dataSourceBuackup: any[] = [];
    @Input() selectedDate: any;
    @Output() selectedDateChange: EventEmitter<any> = new EventEmitter<any>();
    month: any[] = Constans.MONTHS;
    income: any;
    bill: any;
    piggi: any;
    balance: any;
    constructor(
        private userService: UserService,
                private baseService: BaseServiceService
    ) {

    }
    ngOnInit(): void {
        this.month = this.month.map((m) => ({
            ...m,
            command: () => this.onMonthChange(m.value)
        }));
        this.dataSourceBuackup = this.dataSource;
    }
    getMonthIndex(month: number): string {
        const foundMonth = this.month.find((m) => m.value === month);
        return foundMonth?.label;
    }

    onMonthChange(event: any) {
        this.selectedDate = event;
        this.selectedDateChange.emit(this.selectedDate);
    }
}
