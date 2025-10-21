import { useNavigate } from 'react-router-dom'

export const NotFound404Page = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-background p-8 text-center">
      <div className="animate-fade-in">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-2xl font-semibold text-foreground">
          Страница не найдена
        </p>
        <p className="mt-2 max-w-md text-base text-muted-foreground">
          Кажется, вы забрели туда, где ничего нет. Давайте вернёмся домой!
        </p>
        <button
          onClick={handleGoHome}
          className="mt-6 w-fit rounded-md px-6 py-2"
        >
          На главную
        </button>
      </div>
    </div>
  )
}
