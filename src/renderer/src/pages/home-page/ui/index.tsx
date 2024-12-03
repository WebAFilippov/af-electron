import { FC } from 'react'

import { Button } from '@shared/components/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@shared/components/ui/card'

export const HomePage: FC = () => {
  const cardsData = [
    {
      title: 'Card 1',
      description:
        'Description for card 1 Description for card 1Description for card 1Description for card 1Description for card 1Description for card 1 Description for card 1Description for card 1Description for card 1Description for card 1Description for card 1 Description for card 1Description for card 1Description for card 1Description for card 1Description for card 1 Description for card 1Description for card 1Description for card 1Description for card 1'
    },
    { title: 'Card 2', description: 'Description for card 2Description for card 1' },
    { title: 'Card 3', description: 'Description for card 3' },
    { title: 'Card 4', description: 'Description for card 4' },
    { title: 'Card 5', description: 'Description for card 5' },
    { title: 'Card 6', description: 'Description for card 6' },
    { title: 'Card 7', description: 'Description for card 7' },
    { title: 'Card 8', description: 'Description for card 8' },
    { title: 'Card 9', description: 'Description for card 9' },
    { title: 'Card 10', description: 'Description for card 10' },
    { title: 'Card 11', description: 'Description for card 11' },
    { title: 'Card 12', description: 'Description for card 12' },
    { title: 'Card 13', description: 'Description for card 13' },
    { title: 'Card 14', description: 'Description for card 14' },
    { title: 'Card 15', description: 'Description for card 15' }
  ]
  return (
    <div className="h-full overflow-auto pr-2">
      <div className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* {cardsData.map((card, index) => (
          <Card key={index} className="">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent>{card.description}</CardContent>
            <CardFooter>
              <Button className="w-full">Button</Button>
            </CardFooter>
          </Card>
        ))} */}
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent>{cardsData[0].description}</CardContent>
          <CardFooter>
            <Button className="w-full">Button</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
