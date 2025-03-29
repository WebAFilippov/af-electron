// @pages/error-boundary/index.tsx
import { FC, ReactNode } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'

import { Button } from '@shared/ui'

export const ErrorPage: FC<{ children?: ReactNode }> = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  let errorMessage = 'Произошла непредвиденная ошибка'

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || `Ошибка ${error.status}`
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="flex min-h-dvh w-dvw flex-col items-center justify-center overflow-hidden rounded-2xl bg-background p-8 text-center">
      <div className="animate-fade-in">
        <h1 className="text-6xl font-bold text-destructive">Ошибка</h1>
        <p className="mt-4 text-2xl font-semibold text-foreground">{errorMessage}</p>
        <p className="mt-2 max-w-md text-base text-muted-foreground">
          Пожалуйста, попробуйте перезагрузить страницу или вернуться на главную
        </p>
        <Button
          onClick={handleGoHome}
          variant="default"
          className="mt-6 w-fit rounded-md px-6 py-2"
        >
          На главную
        </Button>
      </div>
    </div>
  )
}
