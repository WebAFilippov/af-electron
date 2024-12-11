import { FC } from 'react'

import WeatherCard from '@features/weather/weather-card-home/ui'



export const HomePage: FC = () => {
  return (
    <div className="m-auto flex h-full items-center justify-center overflow-y-auto overflow-x-hidden pr-2">
      <div className="m-auto flex flex-wrap place-items-center items-center justify-center gap-6">
        {/* {Object.entries(ROUTE).map(([key, value]) => (
          <Card key={value.name} className="">
            <CardHeader>
              <CardTitle>{value.name}</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent>{value.name}</CardContent>
            <CardFooter>
              <Button className="w-full">Button</Button>
            </CardFooter>
          </Card>
        ))} */}
        <WeatherCard />
      </div>
    </div>
  )
}
