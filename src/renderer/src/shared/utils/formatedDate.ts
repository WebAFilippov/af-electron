export const formatedDate = (pubDate: string): string => {
  const now = new Date()
  const date = new Date(pubDate)
  if (isNaN(date.getTime())) return 'Дата неизвестна'

  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) {
    if (diffHours < 1) {
      if (diffMinutes < 1) {
        return `${diffSeconds} сек. назад`
      }
      return `${diffMinutes} мин. назад`
    }
    return `${diffHours} ч. назад`
  }

  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
