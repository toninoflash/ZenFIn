import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../core/interfaces';
import { ProductService } from '../../pages/service/product.service';
import { NumberFormatPipe } from '../../core/pipes/number-formt';

@Component({
    selector: 'app-list',
    imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule, NumberFormatPipe],
    template: ` <div class="flex flex-col">
        <div class="card">
            <div class="font-semibold text-xl">{{ title }}</div>
            <p-dataview [value]="dataSource" [layout]="layout">
                <ng-template #header>
                    <div class="flex justify-end">
                        <p-button label="Nuevo" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="sendEmmiter()" *ngIf="newButton"/>
                        <p-select-button [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                            <ng-template #item let-option>
                                <i class="pi " [ngClass]="{ 'pi-bars': option === 'list', 'pi-table': option === 'grid' }"></i>
                            </ng-template>
                        </p-select-button>
                    </div>
                </ng-template>

                <ng-template #list let-items>
                    <div class="flex flex-col">
                        <div *ngFor="let item of items; let i = index">
                            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" [ngClass]="{ 'border-t border-surface': i !== 0 }">
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.type }}</span>
                                            <div class="text-2xl font-medium mt-2 text-primary hover:text-primary-300 cursor-pointer"  (click)="sendView(item.id)">{{ item.iban || item.name}}</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-2">
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{title==='Cuentas'?'Saldo disponible':title==='Productos'?'Estado':'Cuota mensual'}}</span>
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <p-button icon="pi pi-euro" [label]="item.balance | numberFormat" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" styleClass="flex-auto md:flex-initial whitespace-nowrap " (onClick)="sendView(item.id)" *ngIf="title==='Cuentas'"></p-button>
                                            <p-button [label]="item.active?'Activo':'Desactivado'" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" styleClass="flex-auto md:flex-initial whitespace-nowrap " (onClick)="sendView(item.id)" *ngIf="title==='Productos'"></p-button>
                                            <p-button [label]="item.monthlyPayment" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" styleClass="flex-auto md:flex-initial whitespace-nowrap " (onClick)="sendView(item.id)" *ngIf="title==='Mis prestamos e hipotecas'"></p-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template #grid let-items>
                    <div class="grid grid-cols-12 gap-4">
                        <div *ngFor="let item of items; let i = index" class="col-span-12 sm:col-span-4 lg:col-span-2 p-2">
                            <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
                                <div class="pt-12">
                                    <div class="flex flex-row justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.type }}</span>
                                            <div class="text-lg font-medium mt-1">{{ item.iban || item.name}}</div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-6 mt-6">
                                        <span class="text-2xl font-semibold">{{ item.balance ||  item.monthlyPayment  | numberFormat}}$ </span>
                                        <div class="flex gap-2 justify-end">
                                             <p-button label="Ver" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" styleClass="flex-auto md:flex-initial whitespace-nowrap " (onClick)="sendView(item.id)"></p-button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataview>
        </div>
    </div>`,
    styles: `
        ::ng-deep {
            .p-orderlist-list-container {
                width: 100%;
            }
        }
    `,
    providers: [ProductService]
})
export class AppLayout {
    @Input() title: string = '';
    @Input() dataSource: any[] = [];
    @Input() newButton: boolean = true;
    @Output() visibleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() viewEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    layout: 'list' | 'grid' = 'list';

    options = ['list', 'grid'];

    products: Product[] = [];

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((data) => (this.products = data.slice(0, 6)));

        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }
        ];

        this.targetCities = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }
        ];
        console.log(this.dataSource);
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return 'info';
        }
    }

    sendEmmiter() {
        this.visibleEmitter.emit(true);
    }
    sendView(id:any) {
        this.viewEmitter.emit(id);
    }
}
