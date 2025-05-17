import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'formatValue',
  standalone: true,
})
export class FormatValuePipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value === 'number' && !isNaN(value)) {
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value)
    }
    return value
  }
}
