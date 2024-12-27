import { FC, lazy, Suspense } from 'react'

import { Skeleton } from './skeleton'

type IconProps = {
  width?: number | string
  height?: number | string
  className?: string
}

type Props = {
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIcon_01d = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/01d'))
const WeatherIcon_01n = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/01n'))
const WeatherIcon02d = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/02d'))
const WeatherIcon02n = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/02n'))
const WeatherIcon03d = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/03d'))
const WeatherIcon03n = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/03n'))
const WeatherIcon04d = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/04d'))
const WeatherIcon04n = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/04n'))
const WeatherIconMist = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/mist'))
const WeatherIconSmokeDay = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/smoke-day'))
const WeatherIconSmokeNight = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/smoke-night')
)
const WeatherIconHazeDay = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/haze-day'))
const WeatherIconHazeNight = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/haze-night'))
const WeatherIconSandDust = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/sand-dust'))
const WeatherIconFogDay = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/fog-day'))
const WeatherIconFogNight = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/fog-night'))
const WeatherIconDustDay = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/dust-day'))
const WeatherIconDustNight = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/dust-night'))
const WeatherIconTornado = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/tornado'))
const WeatherIconSnowDay = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/snow-day'))
const WeatherIconSnowNight = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/snow-night'))
const WeatherIconSleetDay = lazy<FC<IconProps>>(() => import('../../assets/svg-icons/sleet-day'))
const WeatherIconSleetNight = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/sleet-night')
)
const WeatherIconDrizzleDay = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/drizzle-day')
)
const WeatherIconDrizzleNight = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/drizzle-night')
)
const ThunderstormsDay = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/thunderstorms-day')
)
const ThunderstormsNight = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/thunderstorms-night')
)
const ThunderstormsRainDay = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/thunderstorms-rain-day')
)
const ThunderstormsRainNight = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/thunderstorms-rain-night')
)
const ThunderstormsSnowDay = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/thunderstorms-snow-night')
)
const ThunderstormsSnowNight = lazy<FC<IconProps>>(
  () => import('../../assets/svg-icons/thunderstorms-snow-night')
)

const getIcon = (weatherId: number, weatherIcon: string) => {
  const icons: Record<number, Record<string, FC<IconProps>>> = {
    800: { '01d': WeatherIcon_01d, '01n': WeatherIcon_01n },
    801: { '02d': WeatherIcon02d, '02n': WeatherIcon02n },
    802: { '03d': WeatherIcon03d, '03n': WeatherIcon03n },
    803: { '04d': WeatherIcon04d, '04n': WeatherIcon04n },
    804: { '04d': WeatherIcon04d, '04n': WeatherIcon04n },
    701: { '50d': WeatherIconMist, '50n': WeatherIconMist },
    711: { '50d': WeatherIconSmokeDay, '50n': WeatherIconSmokeNight },
    721: { '50d': WeatherIconHazeDay, '50n': WeatherIconHazeNight },
    731: { '50d': WeatherIconSandDust, '50n': WeatherIconSandDust },
    741: { '50d': WeatherIconFogDay, '50n': WeatherIconFogNight },
    751: { '50d': WeatherIconMist, '50n': WeatherIconMist },
    761: { '50d': WeatherIconDustDay, '50n': WeatherIconDustNight },
    762: { '50d': WeatherIconMist, '50n': WeatherIconMist },
    771: { '50d': WeatherIconMist, '50n': WeatherIconMist },
    781: { '50d': WeatherIconTornado, '50n': WeatherIconTornado },
    600: { '13d': WeatherIconSnowDay, '13n': WeatherIconSnowNight },
    601: { '13d': WeatherIconSnowDay, '13n': WeatherIconSnowNight },
    602: { '13d': WeatherIconSnowDay, '13n': WeatherIconSnowNight },
    611: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    612: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    613: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    615: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    616: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    620: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    621: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    622: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    500: { '10d': WeatherIconSleetDay, '10n': WeatherIconSleetNight },
    501: { '10d': WeatherIconSleetDay, '10n': WeatherIconSleetNight },
    502: { '10d': WeatherIconSleetDay, '10n': WeatherIconSleetNight },
    503: { '10d': WeatherIconSleetDay, '10n': WeatherIconSleetNight },
    504: { '10d': WeatherIconSleetDay, '10n': WeatherIconSleetNight },
    511: { '13d': WeatherIconSleetDay, '13n': WeatherIconSleetNight },
    520: { '09d': WeatherIconSleetDay, '09n': WeatherIconSleetNight },
    521: { '09d': WeatherIconSleetDay, '09n': WeatherIconSleetNight },
    522: { '09d': WeatherIconSleetDay, '09n': WeatherIconSleetNight },
    531: { '09d': WeatherIconSleetDay, '09n': WeatherIconSleetNight },
    300: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    301: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    302: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    310: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    311: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    312: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    313: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    314: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    321: { '09d': WeatherIconDrizzleDay, '09n': WeatherIconDrizzleNight },
    200: { '11d': ThunderstormsRainDay, '11n': ThunderstormsRainNight },
    201: { '11d': ThunderstormsRainDay, '11n': ThunderstormsRainNight },
    202: { '11d': ThunderstormsRainDay, '11n': ThunderstormsRainNight },
    210: { '11d': ThunderstormsDay, '11n': ThunderstormsNight },
    211: { '11d': ThunderstormsDay, '11n': ThunderstormsNight },
    212: { '11d': ThunderstormsDay, '11n': ThunderstormsNight },
    221: { '11d': ThunderstormsDay, '11n': ThunderstormsNight },
    230: { '11d': ThunderstormsSnowDay, '11n': ThunderstormsSnowNight },
    231: { '11d': ThunderstormsSnowDay, '11n': ThunderstormsSnowNight },
    232: { '11d': ThunderstormsSnowDay, '11n': ThunderstormsSnowNight }
  }

  return icons[weatherId]?.[weatherIcon] || WeatherIcon03d
}

export const WeatherIcon: FC<Props> = ({ weather, width, height, className }) => {
  const ComponentIcon = getIcon(weather.id, weather.icon)

  return (
    <Suspense fallback={<Skeleton style={{ width, height }} className="bg-muted-foreground" />}>
      <ComponentIcon width={width} height={height} className={className} />
    </Suspense>
  )
}
