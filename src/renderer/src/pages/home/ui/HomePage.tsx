import { useUnit } from 'effector-react'
import { Link } from 'react-router-dom'

import { $updateData } from '@entities/updater/model/updater'

import { ROUTES } from '@shared/config/routing'
import { Card, CardDescription, CardTitle } from '@shared/ui'

export const HomePage = () => {
  const updateData = useUnit($updateData)

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-10">
      {/* Блок с информацией об обновлении */}
      {updateData && (
        <div className="mb-8 w-full max-w-2xl rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Информация об обновлении</h2>
          <pre className="overflow-auto rounded bg-muted/50 p-4 text-sm text-foreground">
            {JSON.stringify(updateData, null, 2)}
          </pre>
        </div>
      )}

      {/* Основной контент */}
      <h1 className="mb-6 text-4xl font-bold text-foreground">Добро пожаловать</h1>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {ROUTES.map((item) => (
          <Link to={item.path} key={item.path}>
            <Card className="flex h-28 flex-row items-center gap-4 bg-card p-4 transition-colors duration-0 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-xl font-semibold text-foreground">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {item.description}
                </CardDescription>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
