import { createRoute } from 'atomic-router'
import { FC } from 'react'

export const homePage = createRoute()

export const HomePage: FC = () => {
  return (
    <div className="container grid h-full grid-cols-3 place-content-stretch gap-[2rem] py-[4rem] ">
      <div className="rounded-lg bg-foreground">01</div>
      <div className="rounded-lg bg-foreground">02</div>
      <div className="rounded-lg bg-foreground">03</div>
      <div className="rounded-lg bg-foreground">04</div>
      <div className="rounded-lg bg-foreground">05</div>
      <div className="rounded-lg bg-foreground">06</div>
    </div>
  )
}
