import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'formatNumberSuffixe',
  standalone: true,
})
export class FormatNumberSuffixePipe implements PipeTransform {
  transform(
    value: number | string,
    decimalPlaces = 0,
    currencyLabel = 'FCFA', // Le suffixe monétaire est optionnel et personnalisable
  ): string {
    if (value === null || value === undefined || value === '') {
      return `0${
        decimalPlaces > 0 ? ',' + '0'.repeat(decimalPlaces) : ''
      }\u00A0${currencyLabel}`
    }

    const numberValue = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(numberValue)) {
      return `0${
        decimalPlaces > 0 ? ',' + '0'.repeat(decimalPlaces) : ''
      } ${currencyLabel}`
    }

    // Sépare partie entière et décimale
    const [entier, decimal] = numberValue.toFixed(decimalPlaces).split('.')

    // Ajoute l’espace insécable fine U+202F entre les milliers
    let formatted = ''
    let counter = 0
    for (let i = entier.length - 1; i >= 0; i--) {
      formatted = entier[i] + formatted
      counter++
      if (counter % 3 === 0 && i !== 0) {
        formatted = '\u202F' + formatted
      }
    }

    // Ajoute les décimales si besoin
    const decimalPart = decimalPlaces > 0 ? `,${decimal}` : ''

    return `${formatted}${decimalPart} ${currencyLabel}`
  }
}
