import { Link } from 'react-router-dom'

import { ROUTES } from '@shared/config/routing'
import { Button, Card, CardDescription, CardTitle } from '@shared/ui'

export const HomePage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center p-10">
      <h1 className="mb-6 text-4xl font-bold text-foreground">Добро пожаловать</h1>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {ROUTES.map((item) => (
          <Link to={item.path} key={item.path}>
            <Card className="flex h-28 flex-row items-center gap-4 bg-card p-4 transition-all duration-300 hover:shadow-md">
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
      <Button className="mt-5" onClick={() => window.api.checkForUpdates()}>
        Check
      </Button>
    </div>
  )
}
