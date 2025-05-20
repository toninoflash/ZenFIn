import { Component } from '@angular/core';
import { AppLayout } from '../../layout/component/app.list';


@Component({
    selector: 'app-piggy',
    imports: [ AppLayout],
        template: ` <app-list [title]="title"></app-list>`,

})
export class Piggy {
    title="Mis huchas e inversiones";
}
