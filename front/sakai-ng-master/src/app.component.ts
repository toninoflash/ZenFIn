import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    ngOnInit() {
    // Verifica el tema almacenado en localStorage

      const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'app-dark') {
      document.querySelector('html')?.classList.add('app-dark'); // Aplica el tema oscuro
    }
  }


}
