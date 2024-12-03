import { FC, PropsWithChildren } from 'react'

type Props = {
  className?: string
}

export const WeatherPage: FC<PropsWithChildren<Props>> = ({ className }) => {
  return <div className={className}>WeatherPage</div>
}
