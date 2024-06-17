

export const displayNumber = (value: number, locales: string = 'en-US'): string => {
  const numberFormatter = Intl.NumberFormat(locales);
  return numberFormatter.format(value);
}
export const displayMoney = (value: number, locales: string = 'en-US', currency: string = 'IDR'): string => {
  return Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}