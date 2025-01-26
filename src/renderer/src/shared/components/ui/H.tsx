import { cn } from '@shared/lib'

export const Logo = () => {
  return (
    <div
      className={cn(
        'text-6xl font-bold', // Стили для текста
        'bg-gradient-to-r from-transparent via-black to-transparent', // Градиентный фон
        'bg-clip-text text-transparent' // Применение градиента к тексту
      )}
    >
      H
    </div>
  )
}
