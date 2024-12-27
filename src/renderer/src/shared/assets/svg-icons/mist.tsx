import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIconMist: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient
          id="a"
          x1="220"
          y1="137.65"
          x2="292"
          y2="262.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#d4d7dd" />
          <stop offset="0.45" stop-color="#d4d7dd" />
          <stop offset="1" stop-color="#bec1c6" />
        </linearGradient>
        <linearGradient id="b" y1="193.65" y2="318.35" xlinkHref="#a" />
        <linearGradient id="c" y1="249.65" y2="374.35" xlinkHref="#a" />
      </defs>

      <line
        x1="136"
        y1="200"
        x2="376"
        y2="200"
        fill="none"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="24"
        stroke="url(#a)"
      >
        <animateTransform
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-48 0; 48 0; -48 0"
          dur="6s"
          repeatCount="indefinite"
        />
      </line>

      <line
        x1="136"
        y1="256"
        x2="376"
        y2="256"
        fill="none"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="24"
        stroke="url(#b)"
      >
        <animateTransform
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-48 0; 48 0; -48 0"
          begin="-1.5s"
          dur="6s"
          repeatCount="indefinite"
        />
      </line>

      <line
        x1="136"
        y1="312"
        x2="376"
        y2="312"
        fill="none"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="24"
        stroke="url(#c)"
      >
        <animateTransform
          attributeName="transform"
          additive="sum"
          type="translate"
          values="48 0; -48 0; 48 0"
          dur="6s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  )
}

export default WeatherIconMist
