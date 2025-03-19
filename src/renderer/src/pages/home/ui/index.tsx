import { Link } from 'react-router-dom'

import { ROUTES } from '@shared/config/routing'
import { Card, CardDescription, CardTitle } from '@shared/ui'

export const HomePage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center p-10">
      <div className="grid w-full grid-cols-2 justify-center gap-6">
        {ROUTES.map((item) => (
          <Link to={item.path} className="flex justify-center">
            <Card
              key={item.path}
              className="flex cursor-pointer select-none flex-col justify-between p-4 transition-all hover:shadow-lg"
            >
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
