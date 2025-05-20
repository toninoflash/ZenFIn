import { Component } from '@angular/core';
import { AppLayout } from "../../layout/component/app.list";



@Component({
    selector: 'app-credit',
    imports: [ AppLayout],
        template: ` <app-list [title]="title"></app-list>`,

})
export class Credit {
    title="Mis prestamos e hipotecas";
}
