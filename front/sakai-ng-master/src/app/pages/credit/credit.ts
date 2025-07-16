import { Component, Input, OnInit } from '@angular/core';
import { AppLayout } from '../../layout/component/app.list';
import { UserService } from '../../core/services/users/users.service';
import { BaseServiceService } from '../../core/services/base-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-credit',
    imports: [AppLayout],
    template: ` <app-list [title]="title" [dataSource]="credits" (visibleEmitter)="visibilityModal()" (viewEmitter)="viewAccount($event)" [newButton]="false"></app-list>`
})
export class Credit implements OnInit {
    title = 'Mis prestamos e hipotecas';
    credits: any[] = [];
    userLogin: any;
    visible = false;
    private destroy$ = new Subject<void>();
    stateOptions: any[] = [];
    formGroup!: FormGroup;
    spinner: boolean = false;

    constructor(
        private userService: UserService,
        private baseService: BaseServiceService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (sessionStorage.getItem('us')) {
            const storedUser = sessionStorage.getItem('us');
            this.userLogin = storedUser ? JSON.parse(storedUser) : null;
        } else {
            this.userLogin = this.userService.user;
        }
        this.credits = this.userLogin?.credits || [];

        this.stateOptions = [
            { name: 'Cuenta corriente', code: 'NY' },
            { name: 'Cuenta crédito', code: 'RM' }
        ];

        this.formGroup = new FormGroup({
            type: new FormControl<any | null>(null),
            iban: new FormControl<any | null>(null)
        });
    }
    visibilityModal() {
        this.visible = true;
    }
    viewAccount(event: any) {
        this.router.navigate([`/credit/${event}`]);
    }
}
