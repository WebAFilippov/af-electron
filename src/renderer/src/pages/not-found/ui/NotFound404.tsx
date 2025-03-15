import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@shared/ui'

export const NotFound404: FC = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/') // Переход на главную страницу
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">Страница не найдена</p>
      <p className="mt-2 text-base text-gray-500">
        Кажется, вы забрели туда, где ничего нет. Давайте вернёмся домой!
      </p>
      <Button
        onClick={handleGoHome}
        variant="outline"
        className="mt-6 w-fit rounded-md border-gray-300 px-6 py-2 text-gray-900 hover:bg-gray-100"
      >
        На главную
      </Button>
    </div>
  )
}
