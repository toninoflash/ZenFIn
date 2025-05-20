import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BaseServiceService } from './services/base-service.service';
import { MessageService } from 'primeng/api';
import { User } from './models/user';

export class Utils {
  TODAY: Date = new Date();

  constructor() {}

  static showMessage(
    messageService: MessageService,
    severity: string,
    summary: string,
    detail: string
  ) {
    messageService.add({ severity, summary, detail });
  }
  // Método para formatear la fecha
  static formatDate(date: Date): string {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      weekday: 'short', // Día de la semana abreviado (Lun, Mar, etc.)
      day: '2-digit', // Día del mes con dos dígitos
      month: 'short', // Mes abreviado (ene, feb, mar, etc.)
      year: 'numeric', // Año completo
    });

    // Formatear la fecha
    const formattedDate = formatter.format(date);

    // Capitalizar la primera letra del mes
    return formattedDate.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  static formatDateAndTime(date: Date): string {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      weekday: 'short', // Día de la semana abreviado (Lun, Mar, etc.)
      day: '2-digit', // Día del mes con dos dígitos
      month: 'short', // Mes abreviado (ene, feb, mar, etc.)
      year: 'numeric', // Año completo
      hour: '2-digit', // Hora con dos dígitos
      minute: '2-digit', // Minutos con dos dígitos
    });

    // Formatear la fecha
    const formattedDate = formatter.format(date);

    // Capitalizar la primera letra del mes
    return formattedDate.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  static paintMothActuallity(passData?: boolean): string {
    // Obtener la fecha actual
    const date = new Date();

    if (passData) {
      // Ajustar el día al 1 para evitar problemas con meses de diferente duración
      date.setDate(1);

      // Restar un mes a la fecha actual
      date.setMonth(date.getMonth() - 1);
    }

    // Formatear el mes en español y capitalizar la primera letra
    return new Intl.DateTimeFormat('es-ES', { month: 'long' })
      .format(date)
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  static parseSpanishDate(dateString: string): Date | null {
    // Mapea los nombres de los meses en español a índices (0 = enero, 11 = diciembre)
    const monthsMap: { [key: string]: number } = {
      Ene: 0,
      Feb: 1,
      Mar: 2,
      Abr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Ago: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dic: 11,
    };

    // Elimina el nombre del día (por ejemplo, "Mié, ")
    const cleanDateString = dateString.split(', ')[1]; // "02 Abr 2025"

    // Divide el string en partes (día, mes, año)
    const [day, month, year] = cleanDateString.split(' ');

    // Obtén el índice del mes usando el mapa
    const monthIndex = monthsMap[month];

    // Si el mes no es válido, devuelve null
    if (monthIndex === undefined) {
      console.error('Mes no válido:', month);
      return null;
    }

    // Crea un objeto Date usando los valores procesados
    return new Date(Number(year), monthIndex, Number(day));
  }


  static setItemMenu(artist:User, isLogged:boolean = true) {
    const baseMenuItems = [
      {
        label: 'Datos',
        icon: 'pi pi-bolt',
        routerLink: [`/profile/${artist?.id}/arthist`],
      },
      {
        label: 'Obras',
        icon: 'pi pi-image',
        expanded: false,
        children: [
          {
            label: 'Galería',
            routerLink: `/profile/artwork/${artist?.id}/gallery/${artist?.id}`,
          },
        ],
      },
      {
        label: 'Favoritos',
        icon: 'pi pi-pencil',
        routerLink: 'dashboard',
      },
    ];
    if (isLogged) {
      const obrasMenuItem = baseMenuItems.find(item => item.label === 'Obras');
      if (obrasMenuItem && obrasMenuItem.children) {
        obrasMenuItem.children.push({
          label: 'Gestión',
          routerLink: `/profile/artwork/${artist?.id}/table`,
        });
      }
    }
    return baseMenuItems;
  }
}
