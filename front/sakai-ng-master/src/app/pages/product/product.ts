import { Component } from '@angular/core';
import { AppLayout } from '../../layout/component/app.list';
import { UserService } from '../../core/services/users/users.service';
import { BaseServiceService } from '../../core/services/base-service.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/environment';

const endpoint: any = environment.baseUrlSpring;

@Component({
    selector: 'app-product',
    imports: [CommonModule, AccordionModule, MenuModule, ChartModule, ButtonModule, FormsModule, ReactiveFormsModule],
    template: ` <div class="layout-default">
  <div class="mb-6">
    <div class="flex justify-between items-center">
      <div class="flex items-baseline">
        <h1 class="mb-0 text-2xl font-semibold">Todos mis productos</h1>
      </div>
      <div class="ml-4">
        <p-menu #menu [popup]="true" [model]="items"></p-menu>
        <button pButton icon="pi pi-ellipsis-v" (click)="menu.toggle($event)" class="p-button-text p-button-rounded"></button>
      </div>
    </div>
  </div>

  <!-- Contenedor principal con dos columnas usando Tailwind -->
  <div class="flex flex-col md:flex-row md:space-x-6">
    <!-- Columna izquierda - Cuánto tengo -->
    <div class="w-full md:w-1/2">
      <div class="rounded-lg shadow-sm p-6 mb-6">
        <div class="max-w-xs mx-auto text-center">
          <div class="text-xl font-semibold mb-4">Cuánto tengo</div>
          <div class="text-3xl font-bold">{{totalBalanceAccount}} €</div>
        </div>

        <!-- Gráfico semi-circular -->
        <div class="p-4 mt-6">
          <p-chart type="doughnut" [data]="chartDataTengo" [options]="chartOptions" width="100%" height="160px"></p-chart>
        </div>

        <!-- Agrupación Cuentas a la vista -->
        <div class="border-t border-gray-200 mt-4"></div>
        <div class="accordion">
          <p-accordion value="0">
            <p-accordion-panel value="0">
              <p-accordion-header>Cuentas a la vista</p-accordion-header>
              <p-accordion-content>
                <div class="flex justify-between items-center py-2">
                  <span class="text-lg font-semibold">{{totalBalanceAccount}} €</span>
                </div>
                <div class="border-t border-gray-200"></div>

                <div class="relative hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200" *ngFor="let account of accounts">
                  <a class="absolute inset-0 z-10" href="#"></a>
                  <div class="flex items-center py-3 px-4 relative">
                    <i class="pi pi-wallet text-2xl text-blue-600 mr-4"></i>
                    <div class="pr-4">
                      <div class="font-medium">{{account.type}}</div>
                      <div class="text-sm text-primary">{{account.iban}}</div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="font-medium">{{account.balance}}€</div>
                    </div>
                    <div class="ml-2">
                      <p-menu #menuCuenta [popup]="true" [model]="menuItemsCuenta"></p-menu>
                      <button pButton icon="pi pi-ellipsis-v" (click)="menuCuenta.toggle($event)" class="p-button-text p-button-rounded"></button>
                    </div>
                  </div>
                </div>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>

        <!-- Otros productos -->
        <div class="border-t border-gray-200 mt-6"></div>
        <div class="max-w-xs mx-auto text-center mt-6">
          <div class="text-xl font-semibold">Otros productos</div>
        </div>
        <div class="border-t border-gray-200 mt-4"></div>

        <!-- Seguros de Hogar y Automóviles -->
        <div class="accordion">
          <p-accordion value="0">
            <p-accordion-panel value="0">
              <p-accordion-header>Seguros de Hogar y Automóviles</p-accordion-header>
              <p-accordion-content>
                <div class="relative hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <a class="absolute inset-0 z-10" href="#"></a>
                  <div class="flex items-center py-3 px-4 relative">
                    <i class="pi pi-shield text-2xl text-blue-600 mr-4"></i>
                    <div class="pr-4">
                      <div class="font-medium">Protecc. Jurídica</div>
                      <div class="text-sm text-gray-600">69.0216622-06</div>
                    </div>
                    <div class="ml-auto"></div>
                    <div class="ml-2">
                      <button pButton icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded"></button>
                    </div>
                  </div>
                </div>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>

        <!-- Seguros de Vida, Accidente y Salud -->
        <div class="accordion">
          <p-accordion value="0">
            <p-accordion-panel value="0">
              <p-accordion-header>Seguros de Vida, Accidente y Salud</p-accordion-header>
              <p-accordion-content>
                <!-- Producto 1 -->
                <div class="relative hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <a class="absolute inset-0 z-10" href="#"></a>
                  <div class="flex items-center py-3 px-4 relative">
                    <i class="pi pi-heart text-2xl text-blue-600 mr-4"></i>
                    <div class="pr-4">
                      <div class="font-medium">SC Acc. Plurianual</div>
                      <div class="text-sm text-gray-600">43.3188842-19</div>
                    </div>
                    <div class="ml-auto"></div>
                    <div class="ml-2">
                      <button pButton icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded"></button>
                    </div>
                  </div>
                </div>
                <div class="border-t border-gray-200"></div>

                <!-- Producto 2 -->
                <div class="relative hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <a class="absolute inset-0 z-10" href="#"></a>
                  <div class="flex items-center py-3 px-4 relative">
                    <i class="pi pi-heart text-2xl text-blue-600 mr-4"></i>
                    <div class="pr-4">
                      <div class="font-medium">Vida familiar</div>
                      <div class="text-sm text-gray-600">20.7872715-21</div>
                    </div>
                    <div class="ml-auto"></div>
                    <div class="ml-2">
                      <button pButton icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded"></button>
                    </div>
                  </div>
                </div>
                <div class="border-t border-gray-200"></div>

                <!-- Producto 3 -->
                <div class="relative hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <a class="absolute inset-0 z-10" href="#"></a>
                  <div class="flex items-center py-3 px-4 relative">
                    <i class="pi pi-heart text-2xl text-blue-600 mr-4"></i>
                    <div class="pr-4">
                      <div class="font-medium">Seviam abierto</div>
                      <div class="text-sm text-gray-600">22.9702805-11</div>
                    </div>
                    <div class="ml-auto"></div>
                    <div class="ml-2">
                      <button pButton icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded"></button>
                    </div>
                  </div>
                </div>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>
      </div>
    </div>

    <!-- Columna derecha - Cuánto debo -->
    <div class="w-full md:w-1/2">
      <div class="rounded-lg shadow-sm p-6 mb-6">
        <div class="max-w-xs mx-auto text-center">
          <div class="text-xl font-semibold mb-4">Cuánto debo</div>
          <div class="text-3xl font-bold">18.019,46 €</div>
        </div>

        <!-- Gráfico semi-circular -->
        <div class="p-4 mt-6">
          <p-chart type="doughnut" [data]="chartDataDebo" [options]="chartOptions" width="100%" height="160px"></p-chart>
        </div>

        <!-- Agrupación Hipotecas -->
        <div class="border-t border-gray-200 mt-4"></div>
        <div class="accordion">
          <p-accordion value="0">
            <p-accordion-panel value="0">
              <p-accordion-header>Hipotecas</p-accordion-header>
              <p-accordion-content>
                <div class="flex justify-between items-center py-2">
                  <span class="text-lg font-semibold">10.566,92 €</span>
                </div>
                <div class="border-t border-gray-200"></div>

                <div class="relative hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <a class="absolute inset-0 z-10" href="#"></a>
                  <div class="flex items-center py-3 px-4 relative">
                    <i class="pi pi-home text-2xl text-yellow-500 mr-4"></i>
                    <div class="pr-4">
                      <div class="font-medium">Préstamo hipotec.</div>
                      <div class="text-sm text-gray-600">317.548382-50</div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="font-medium">10.566,92 €</div>
                    </div>
                    <div class="ml-2">
                      <button pButton icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded"></button>
                    </div>
                  </div>
                </div>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>

        <!-- Agrupación Préstamos -->
        <div class="border-t border-gray-200 mt-4"></div>
        <div class="accordion">
          <p-accordion value="0">
            <p-accordion-panel value="0">
              <p-accordion-header>Préstamos</p-accordion-header>
              <p-accordion-content>
                <div class="flex justify-between items-center py-2">
                  <span class="text-lg font-semibold">7.452,54 €</span>
                </div>
                <div class="border-t border-gray-200"></div>

                <!-- Producto 1 -->
                <div class="relative hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <a class="absolute inset-0 z-10" href="#"></a>
                  <div class="flex items-center py-3 px-4 relative">
                    <i class="pi pi-money-bill text-2xl text-yellow-300 mr-4"></i>
                    <div class="pr-4">
                      <div class="font-medium">Facilitea Canal</div>
                      <div class="text-sm text-gray-600">322.811000-78</div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="font-medium">150,00 €</div>
                    </div>
                    <div class="ml-2">
                      <button pButton icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded"></button>
                    </div>
                  </div>
                </div>
                <div class="border-t border-gray-200"></div>

                <!-- Producto 2 -->
                <div class="relative hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <a class="absolute inset-0 z-10" href="#"></a>
                  <div class="flex items-center py-3 px-4 relative">
                    <i class="pi pi-money-bill text-2xl text-yellow-300 mr-4"></i>
                    <div class="pr-4">
                      <div class="font-medium">Microcr. Personal</div>
                      <div class="text-sm text-gray-600">801.755494-90</div>
                    </div>
                    <div class="ml-auto text-right">
                      <div class="font-medium">7.302,54 €</div>
                    </div>
                    <div class="ml-2">
                      <button pButton icon="pi pi-ellipsis-v" class="p-button-text p-button-rounded"></button>
                    </div>
                  </div>
                </div>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>

        <!-- Agrupación Tarjetas -->
        <div class="border-t border-gray-200 mt-4"></div>
        <div class="accordion">
          <p-accordion value="0">
            <p-accordion-panel value="0">
              <p-accordion-header>Tarjetas</p-accordion-header>
              <p-accordion-content>
                <div class="flex justify-between items-center py-2">
                  <span class="text-lg font-semibold">0,00 €</span>
                </div>
              </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
        </div>
      </div>
    </div>
  </div>
</div>`
})
export class ProductPage {
    title = 'Productos';
    userLogin: any;
    products: any[] = [];
    accounts: any[] = [];
    totalBalanceAccount:Number = 0;

    visible = false;
    stateOptions: any[] = [];
    formGroup!: FormGroup;

    spinner: boolean = false;
    private destroy$ = new Subject<void>();

    chartOptions = {
        cutout: '70%',
        circumference: 180,
        rotation: -90,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    };

    chartDataTengo = {
        labels: ['Cuentas a la vista'],
        datasets: [
            {
                data: [100],
                backgroundColor: ['#5080EF'],
                borderWidth: 0
            }
        ]
    };

    chartDataDebo = {
        labels: ['Hipotecas', 'Préstamos', 'Tarjetas'],
        datasets: [
            {
                data: [10566.92, 7452.54, 0],
                backgroundColor: ['#F4C95D', '#FBDBA7', '#F79D5C'],
                borderWidth: 0
            }
        ]
    };

    // Configuración del menú de opciones
    items = [
        {
            label: 'Opciones',
            items: [
                {
                    label: 'Añadir a favoritos',
                    icon: 'pi pi-star'
                },
                {
                    label: 'Imprimir',
                    icon: 'pi pi-print'
                },
                {
                    label: 'Exportar EXCEL',
                    icon: 'pi pi-file-excel'
                },
                {
                    label: 'Incluir productos con saldo 0',
                    icon: 'pi pi-eye'
                },
                {
                    label: 'Añadir banco',
                    icon: 'pi pi-building'
                }
            ]
        }
    ];

    menuItemsCuenta = [
        {
            label: 'Opciones',
            items: [
                {
                    label: 'Ver últimos movimientos',
                    icon: 'pi pi-list'
                }
            ]
        }
    ];

    constructor(
        private userService: UserService,
        private baseService: BaseServiceService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.userService.userChange.pipe(takeUntil(this.destroy$)).subscribe((user) => {
            if (user) {
                this.userLogin = user;
            } else {
                const storedUser = sessionStorage.getItem('us');
                this.userLogin = storedUser ? JSON.parse(storedUser) : null;
            }
            this.products = this.userLogin?.product || [];
            this.accounts = this.userLogin?.account || [];
            this.totalBalanceAccount = this.accounts.reduce((sum, account) => sum + account.balance, 0);
        });
    }
}
