import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDate = (dateStr: string): string => {
  const date = parse(dateStr, 'dd-MM-yyyy', new Date())
  return format(date, 'd MMMM yyyyг.', { locale: ru })
}
