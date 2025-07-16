import { UserService } from './../../core/services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { environment } from '../../../enviroments/environment';
import { BaseServiceService } from '../../core/services/base-service.service';
import { CustomDatePipe } from '../../core/pipes/custom-date-pipe';
import { NumberFormatPipe } from '../../core/pipes/number-formt';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { Route, Router } from '@angular/router';
import { Utils } from '../../core/utils';
import { InputTextModule } from 'primeng/inputtext';
const endpoint = environment.baseUrlSpring;

@Component({
    standalone: true,
    selector: 'app-simulator',
    imports: [CommonModule, FormsModule, InputNumberModule, SliderModule, DropdownModule, RadioButtonModule, ButtonModule, TableModule, CardModule, InputTextModule, NumberFormatPipe, ToastModule, ConfirmPopupModule],
    providers: [UserService, BaseServiceService, ConfirmationService, MessageService],
    template: ` <div *ngIf="accounts.length >= 1">
            <div class="container mx-auto p-6 ">
                <!-- Título -->
                <div class="text-center mb-8">
                    <h1 class="text-3xl font-bold text-primary">Simulador de Préstamo</h1>
                    <p class=" mt-2">Complete los datos para calcular su préstamo</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div *ngFor="let option of loanTypeOptions" class="cursor-pointer hover:scale-105 transition" (click)="selectLoanType(option)">
                    <div class="rounded-lg shadow-md p-4 text-center h-full flex flex-col" [class.bg-primary]="selectedType === option.value" [class.card]="selectedType !== option.value" [class.text-white]="selectedType === option.value">
                        <div class="h-40 w-full mb-2 overflow-hidden flex items-center justify-center">
                            <img [src]="option.img" alt="{{ option.label }}" class="object-cover w-full h-full" [style.filter]="selectedType === option.value ? 'brightness(0.8)' : 'none'" />
                        </div>

                        <p class="font-semibold mt-auto">{{ option.label }}</p>
                    </div>
                </div>
            </div>
            <div class="container mx-auto p-6 min-h-screen" *ngIf="selectedType">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Formulario de Simulación -->
                    <div class="card rounded-lg shadow-md p-6">
                        <h2 class="text-xl font-semibold mb-4">Datos del Préstamo</h2>

                        <form class="space-y-4">
                            <!-- Plazo -->
                            <div>
                                <label for="term" class="block text-sm font-medium  mb-1">Cuenta asociada</label>
                                <p-dropdown id="term" [(ngModel)]="loan.uid" [options]="accountTypes" optionLabel="label" optionValue="value" class="w-full" name="aid"> </p-dropdown>
                            </div>
                            <!-- Campo Asunto (nuevo) -->
                            <div>
                                <label for="subject" class="block text-sm font-medium mb-1">Asunto*</label>
                                <input id="subject" type="text" pInputText [(ngModel)]="loan.name" class="w-full" name="subject" placeholder="Nombre para identificar préstamo" />
                            </div>
                            <!-- Monto del Préstamo -->
                            <div>
                                <label for="amount" class="block text-sm font-medium  mb-1">Monto solicitado</label>
                                <p-inputNumber id="amount" [(ngModel)]="loan.amount" mode="currency" currency="EUR" locale="es-ES" class="w-full" [min]="1000" [max]="50000" name="amount"> </p-inputNumber>
                                <p-slider [(ngModel)]="loan.amount" [min]="1000" [max]="50000" [step]="500" class="w-full mt-2" name="amountSlider"> </p-slider>
                            </div>

                            <!-- Plazo -->
                            <div>
                                <label for="term" class="block text-sm font-medium  mb-1">Plazo (meses)</label>
                                <p-dropdown id="term" [(ngModel)]="loan.term" [options]="termOptions" optionLabel="label" optionValue="value" class="w-full" name="term"> </p-dropdown>
                            </div>

                            <!-- Tasa de Interés -->
                            <div>
                                <label for="rate" class="block text-sm font-medium mb-1">Tasa de interés anual</label>
                                <div class="flex items-center">
                                    <p-inputNumber id="rate" [(ngModel)]="loan.interestRate" suffix="%" [min]="5" [max]="30" [step]="0.5" [mode]="'decimal'" [minFractionDigits]="1" [maxFractionDigits]="2" class="w-full" name="rate"> </p-inputNumber>
                                </div>
                            </div>

                            <!-- Botón de Simulación -->
                            <div class="pt-4">
                                <p-button label="Calcular préstamo" icon="pi pi-calculator" (onClick)="calculateLoan()" class="w-full" [loading]="spinner" [loadingIcon]="'pi pi-spinner'" [disabled]="this.loan.name === ''"> </p-button>
                            </div>
                        </form>
                    </div>

                    <!-- Resultados -->
                    <div class="card rounded-lg shadow-md p-6">
                        <h2 class="text-xl font-semibold  mb-4">Resultados de la Simulación</h2>

                        <div *ngIf="simulationResult" class="space-y-4">
                            <!-- Resumen -->
                            <div class=" p-4 rounded-lg">
                                <h3 class="font-medium ">Resumen del Préstamo</h3>
                                <div class="grid grid-cols-3 gap-4 mt-2">
                                    <div>
                                        <p class="text-sm ">Monto total</p>
                                        <p class="text-lg font-bold">{{ simulationResult.totalAmount | numberFormat }}€</p>
                                    </div>
                                    <div>
                                        <p class="text-sm ">Interés total {{ accountTypes.length }}</p>
                                        <p class="text-lg font-bold">{{ simulationResult.totalInterest | numberFormat }}€</p>
                                    </div>
                                    <div>
                                        <p class="text-sm ">Mensualidad</p>
                                        <p class="text-lg font-bold">{{ this.loan.term }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Cuota Mensual -->
                            <div class="text-center py-6 border-b">
                                <p class="text-sm ">Cuota mensual estimada</p>
                                <p class="text-3xl font-bold text-primary">{{ simulationResult.monthlyPayment | numberFormat }}€</p>
                            </div>

                            <!-- Tabla de Amortización -->
                            <div>
                                <h4 class="font-medium mb-2">Detalle de pagos</h4>
                                <p-table [value]="this.simulationResult.amortizationScheduleamortizationSchedule" [paginator]="true" [rows]="5" styleClass="p-datatable-sm">
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

                            <!-- Botón de Solicitud -->
                            <div class="pt-4">
                                <p-toast />
                                <p-confirmpopup />
                                <p-button (onClick)="confirm1($event)" label="Solicitar préstamo" icon="pi pi-check" styleClass="w-full" [loading]="spinner" [loadingIcon]="'pi pi-spinner'" />
                            </div>
                        </div>

                        <!-- Estado inicial -->
                        <div *ngIf="!simulationResult" class="text-center py-12 ">
                            <i class="pi pi-info-circle text-4xl mb-2"></i>
                            <p>Complete el formulario para ver los resultados</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Título -->
        <div class="text-center mb-8" *ngIf="accounts.length === 0">
            <h1 class="text-3xl font-bold text-primary">Simulador de Préstamo</h1>
            <p class=" mt-2">Debes tener una cuenta a la que asociar el prestamo.</p>
        </div>`
})
export class Simulator implements OnInit {
    userLogin: any = null;
    selectedType: string | null = null;
    spinner = false;
    accounts: any[] = [];
    accountTypes: any[] = [];
    loan = {
        uid: 1,
        name: '',
        amount: 10000,
        term: 12,
        type: 'hipoteca',
        interestRate: 8.5
    };

    termOptions = [
        { label: '12 meses', value: 12 },
        { label: '18 meses', value: 18 },
        { label: '24 meses', value: 24 },
        { label: '36 meses (3 años)', value: 36 },
        { label: '48 meses (4 años)', value: 48 },
        { label: '60 meses (5 años)', value: 60 },
        { label: '72 meses (6 años)', value: 72 },
        { label: '84 meses (7 años)', value: 84 },
        { label: '96 meses (8 años)', value: 96 },
        { label: '108 meses (9 años)', value: 108 },
        { label: '120 meses (10 años)', value: 120 },
        { label: '180 meses (15 años)', value: 180 },
        { label: '240 meses (20 años)', value: 240 },
        { label: '300 meses (25 años)', value: 300 },
        { label: '360 meses (30 años)', value: 360 },
        { label: '420 meses (35 años)', value: 420 }
    ];

    loanTypes = [
        { label: 'Personal', value: 'personal' },
        { label: 'Hipotecario', value: 'mortgage' },
        { label: 'Automóvil', value: 'car' }
    ];

    loanTypeOptions = [
        { label: 'Hipoteca', value: 'Prestamo hipotecario', img: 'https://res.cloudinary.com/dfnywietn/image/upload/v1747924970/home-2409009_640_gzcisc.jpg' },
        { label: 'Vehículo', value: 'Prestamo vehiculo', img: 'https://res.cloudinary.com/dfnywietn/image/upload/v1747924913/Dise%C3%B1o_sin_t%C3%ADtulo_1_zuog3c.png' },
        { label: 'Reformar hogar', value: 'Prestamo reforma', img: 'https://res.cloudinary.com/dfnywietn/image/upload/v1747924747/mixer-19715_640_q9pz6a.jpg' },
        { label: 'Otro', value: 'Prestamo personal', img: 'https://res.cloudinary.com/dfnywietn/image/upload/v1747924757/pc-1207886_640_vvj6rj.jpg' }
    ];
    simulationResult: any = null;
    constructor(
        private userService: UserService,
        private baseService: BaseServiceService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) {}
    ngOnInit() {
        if (sessionStorage.getItem('us')) {
            const storedUser = sessionStorage.getItem('us');
            this.userLogin = storedUser ? JSON.parse(storedUser) : null;
        } else {
            this.userLogin = this.userService.user;
        }
        this.accounts = this.userLogin.account;
        this.accountTypes = this.accounts.map((a) => ({
            label: a.iban,
            value: a.id
        }));
    }
    calculateLoan() {
        const url = endpoint + 'credit/simulation';
        this.spinner = true;
        const body = {
            amount: this.loan.amount,
            name: this.loan.name,
            term: this.loan.term,
            type: this.loan.type,
            interestRate: this.loan.interestRate,
            uid: this.userLogin.id
        };
        this.baseService.postItem(url, body).subscribe((response: any) => {
            console.log('Respuesta del servidor:', response);
            this.simulationResult = response;
            (this.simulationResult.aid = this.loan.uid), (this.simulationResult.amortizationScheduleamortizationSchedule = this.generateAmortizationSchedule());
            this.spinner = false;
        });
    }

    private generateAmortizationSchedule() {
        const schedule = [];
        let balance = this.loan.amount; // Monto inicial del préstamo

        for (let month = 1; month <= this.loan.term; month++) {
            const interest = balance * (this.loan.interestRate / 100 / 12);
            const principal = this.simulationResult.monthlyPayment - interest;
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

    selectLoanType(option: any) {
        this.selectedType = option.value;
        this.loan.type = option.value; // opcional: precargar tipo
    }
    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: '¿Estas seguro?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Mejor no',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Vamos a ello'
            },
            accept: () => {
                this.create();
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }
    create() {
        const url = endpoint + 'credit';
        this.spinner = true;

        this.baseService.postItem(url, this.simulationResult).subscribe((response: any) => {
            console.log('Respuesta del servidor:', response);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            Utils.reloadUser(this.baseService, this.userService).subscribe((resp: any) => {
                // Esto se ejecuta SOLO después de que reloadUser() haya terminado
                console.log('Respuesta de reloadUser:', resp);
                this.userService.user = resp;
                this.userLogin = this.userService.user;
                this.spinner = false;
                this.router.navigate(['/credit']);
            });
        });
    }
}
