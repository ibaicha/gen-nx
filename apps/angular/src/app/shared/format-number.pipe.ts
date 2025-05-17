import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'formatNumber',
  standalone: true,
})
export class FormatNumberPipe implements PipeTransform {
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
