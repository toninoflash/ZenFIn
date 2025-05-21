import { BaseServiceService } from './../../core/services/base-service.service';
import { UserService } from './../../core/services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { AppLayout } from '../../layout/component/app.list';
import { Dialog, DialogModule } from 'primeng/dialog';
import { Button, ButtonModule } from 'primeng/button';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select, SelectModule } from 'primeng/select';
import { environment } from '../../../enviroments/environment';
import { Top } from './components/top';
import { ActivatedRoute } from '@angular/router';
import { Crud } from '../crud/crud';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { DatePicker } from 'primeng/datepicker';
import { Utils } from '../../core/utils';
import { CustomDatePipe } from '../../core/pipes/custom-date-pipe';
import { NumberFormatPipe } from '../../core/pipes/number-formt';
const endpoint: any = environment.baseUrlSpring;
@Component({
    selector: 'app-accountbyid',
    imports: [
        FloatLabelModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        Top,
        Crud,
        CommonModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        DatePicker,
        CustomDatePipe,
        NumberFormatPipe
    ],
    providers: [ConfirmationService],
    template: `
        <app-top [data]="account" [movements]="movements" />
        <div class="my-6">
            <app-crud (visibleEmitter)="visibilityModal()" (editEmitter)="loadModal($event)" (viewEmitter)="viewModal($event)" [dataSource]="products" [cols]="cols" (userEmitter)="reloadUser()"/>
        </div>
        <p-dialog [(visible)]="visible" header="Product Details" [modal]="true">
            <ng-template #content>
                <form [formGroup]="formGroup" class="flex items-center gap-4 my-6">
                    <p-floatlabel>
                        <p-select formControlName="type" [options]="options" optionLabel="name" class="w-full md:w-56" appendTo="body" />
                        <label for="username">Tipo</label>
                    </p-floatlabel>
                    <p-floatlabel>
                        <input id="username" pInputText formControlName="name" />
                        <label for="username">Asunto</label>
                    </p-floatlabel>
                    <p-floatlabel>
                        <p-inputnumber formControlName="cuota" mode="currency" inputId="currency-germany" currency="EUR" locale="es-ES" />
                        <label for="username">Cuota</label>
                    </p-floatlabel>
                    <p-floatlabel>
                        <p-select formControlName="program" [options]="optionsPro" optionLabel="name" class="w-full md:w-56" appendTo="body" />
                        <label for="username">Programado</label>
                    </p-floatlabel>
                    <p-floatlabel>
                        <p-datepicker formControlName="createdAt" appendTo="body" />
                        <label for="username">Primera aportación</label>
                    </p-floatlabel>
                </form>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text />
                <p-button label="Aceptar" icon="pi pi-check" [disabled]="formGroup.invalid" (onClick)="isUpdate ? update() : create()" />
            </ng-template>
        </p-dialog>

        <p-dialog [(visible)]="visibleView" header="Detalles del Producto" [modal]="true">
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
                                <span class="font-semibold">Tipo:</span>
                                <span class="ml-2">{{ product.type }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Cuota:</span>
                                <span class="ml-2">{{ product.cuota | numberFormat }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Programado:</span>
                                <span class="ml-2">{{ product.program }}</span>
                            </div>
                        </div>

                        <!-- Columna Derecha -->
                        <div class="space-y-3">
                            <div>
                                <span class="font-semibold">Estado:</span>
                                <span class="ml-2">
                                    <p-tag [severity]="product.active ? 'primary' : 'danger'" [value]="product.active ? 'Activo' : 'Inactivo'"></p-tag>
                                </span>
                            </div>
                            <div>
                                <span class="font-semibold">Primera aportación:</span>
                                <span class="ml-2">{{ product.createdAt | customDate }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Saldo:</span>
                                <span class="ml-2">{{ product.balance | numberFormat }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Moneda:</span>
                                <span class="ml-2">{{ product.currency }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Sección de fechas -->
                    <div class="mt-6 border-t pt-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span class="font-semibold">Creado el:</span>
                                <span class="ml-2">{{ product.createdAt | customDate }}</span>
                            </div>
                            <div>
                                <span class="font-semibold">Actualizado el:</span>
                                <span class="ml-2">{{ product.updatedAt | customDate }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ng-template>

        </p-dialog>
    `
})
export class Accountbyid implements OnInit {
    title = 'Cuentas';
    id: any;
    userLogin: any;
    account: any;
    product: any;
    movements: any[]= [];
    spinner: boolean = false;
    visible = false;
    visibleView = false;
    formGroup!: FormGroup;
    options: any[] = [];
    optionsPro: any[] = [];
    products: any[] = [];
    cols!: any[];
    isUpdate: boolean = false;
    idProduct: any;
    constructor(
        private userService: UserService,
        private baseService: BaseServiceService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.isUpdate = false;

        if (this.userService.user) {
                this.userLogin = this.userService.user;
            } else {
                const storedUser = sessionStorage.getItem('us');
                this.userLogin = storedUser ? JSON.parse(storedUser) : null;
            }

        // Obtener el ID de la URL
        this.id = this.route.snapshot.paramMap.get('id'); // El '+' convierte el string a número

        // Opcional: Si necesitas reaccionar a cambios en la URL (mismo componente, diferente ID)
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
        });
        this.products = this.userLogin.product.filter((product: any) => product.aid === Number(this.id));
        this.movements = this.userLogin.movements.filter((mov:any) => mov.aid === Number(this.id))
        this.formGroup = new FormGroup({
            type: new FormControl<any | null>(null, Validators.required),
            name: new FormControl<any | null>(null, Validators.required),
            createdAt: new FormControl<any | null>(null, Validators.required),
            program: new FormControl<any | null>(null, Validators.required),
            cuota: new FormControl<any | null>(null, Validators.required)
        });
        this.options = [
            { name: 'Ingreso', code: 'NY' },
            { name: 'Gasto', code: 'RM' },
            { name: 'Ahorro', code: 'RM' }
        ];
        this.optionsPro = [
            { name: 'Eventual', code: 'NY' },
            { name: 'Mensual', code: 'RM' },
            { name: 'Trimestral', code: 'RM' },
            { name: 'Semestral', code: 'RM' },
            { name: 'Anual', code: 'RM' }
        ];
        this.cols = [
            { field: 'name', header: 'Asunto', customExportHeader: 'Product Code' },
            { field: 'type', header: 'Tipo' },
            { field: 'cuota', header: 'Cuota', pipe:'currency' }
        ];
        this.loadAccount();
    }

    loadAccount() {
        const url = endpoint + 'account/' + this.id;
        this.baseService.getItems(url).subscribe((resp: any) => {
            this.account = resp;
        });
    }

    visibilityModal() {
        this.isUpdate = false;
        this.formGroup.reset();
        this.visible = true;
    }
    viewModal(event: any) {
        this.product = event;
        this.visibleView = true;
    }
    loadModal(event: any) {
        // Transforma los valores antes de asignarlos al formulario
        const formData = {
            ...event,
            type: this.options.find((opt) => opt.name === event.type), // Busca el objeto completo en `options`
            program: this.optionsPro.find((opt) => opt.name === event.program), // Busca el objeto en `optionsPro`
            createdAt: event.createdAt ? new Date(event.createdAt) : null // Convierte string a Date
        };
        this.idProduct = formData.id;
        this.formGroup.patchValue(formData); // Asigna los valores transformados
        this.isUpdate = true;

        this.visible = true;
    }
    create() {
        const data: any = this.formGroup.value;
        data.uid = this.userLogin.id;
        data.aid = Number(this.id);
        data.type = data.type.name;
        data.program = data.program.name;
        data.balance = 0;
        data.currency = 'EUR';
        const url = endpoint + 'product';
        this.spinner = true;
        this.baseService.postItem(url, data).subscribe((resp: any) => {
            this.products.push(resp);
            this.userLogin.product = this.products;
            // Ahora reloadUser() retorna un Observable, así que podemos suscribirnos
        Utils.reloadUser(this.baseService, this.userService).subscribe(() => {
            // Esto se ejecuta SOLO después de que reloadUser() haya terminado
            this.userLogin = this.userService.user;
            this.movements = this.userLogin.movements
            this.loadAccount();
            this.visible = false;
            this.spinner = false;
        });
        });
    }
    update() {
        const data: any = this.formGroup.value;
        data.uid = this.userLogin.id;
        data.aid = Number(this.id);
        data.type = data.type.name;
        data.program = data.program.name;
        data.balance = 0;
        data.currency = 'EUR';
        const url = endpoint + 'product/' + this.idProduct;
        this.spinner = true;
        this.baseService.putItem(url, data).subscribe((resp: any) => {
            this.baseService.getItems(endpoint + 'users/full/' + data.uid).subscribe((resp: any) => {
                this.products = resp.product;
                this.userLogin.product = this.products;
                 Utils.reloadUser(this.baseService, this.userService)
                this.visible = false;
                this.spinner = false;
            });
        });
    }

    reloadUser() {
        Utils.reloadUser(this.baseService,this.userService)
    }
}
