import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { CustomDatePipe } from '../../../core/pipes/custom-date-pipe';
import { NumberFormatPipe } from '../../../core/pipes/number-formt';
interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
    pipe?: string;
}
@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule,
            CustomDatePipe,
            NumberFormatPipe],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Movimientos</div>
        <p-table [value]="products" [paginator]="true" [rows]="10" responsiveLayout="scroll">
    <ng-template pTemplate="header">
        <tr>
            <th *ngFor="let col of cols" [pSortableColumn]="col.field" style="min-width:12rem">
                {{ col.header }}
                <p-sortIcon [field]="col.field" />
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr (click)="viewProduct(product)">
            <td *ngFor="let col of cols">
                <!-- Aplica pipes dinámicos si existen -->
                <span *ngIf="!col.pipe">{{ product[col.field] }}</span>
                <span *ngIf="col.pipe === 'currency'">
                    {{ product[col.field] | numberFormat }}
                </span>
                <span *ngIf="col.pipe === 'date'">
                    {{ product[col.field] | customDate }}
                </span>
                <span *ngIf="col.pipe === 'primary'"
                    [class]="product[col.field] === 'Ingreso' ? 'text-primary-400 font-bold' : product[col.field] === 'Gasto' ? 'text-primary-600 font-bold' : 'text-primary-800 font-bold'">
                    {{ product[col.field] }}
                </span>
            </td>
        </tr>
    </ng-template>
</p-table>
    </div>`,
    providers: [ProductService]
})
export class RecentSalesWidget {
    private _products: any;

    @Input()
    set products(value: any) {
        this._products = value;
    }

    get products(): any {
        return this._products;
    }
    @Input() cols!: Column[];
    @Output() viewEmitter: EventEmitter<any> = new EventEmitter<any>();

    product:any
    constructor(private productService: ProductService) {}

    ngOnInit() {
    }
    viewProduct(product: Product) {
        this.product = { ...product };
        this.viewEmitter.emit(this.product);
    }
}
