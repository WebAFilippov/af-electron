import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIconFogDay: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          x1="96"
          y1="-2.35"
          x2="168"
          y2="122.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d4d7dd" />
          <stop offset="0.45" stopColor="#d4d7dd" />
          <stop offset="1" stopColor="#bec1c6" />
        </linearGradient>
        <linearGradient id="b" y1="-50.35" x2="168" y2="74.35" xlinkHref="#a" />
        <linearGradient
          id="c"
          x1="149.99"
          y1="119.24"
          x2="234.01"
          y2="264.76"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="0.45" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <clipPath id="d">
          <rect width="512" height="306" fill="none" />
        </clipPath>
        <symbol id="e" viewBox="0 0 384 384">
          <circle
            cx="192"
            cy="192"
            r="84"
            stroke="#f8af18"
            strokeMiterlimit="10"
            strokeWidth="6"
            fill="url(#c)"
          />

          <path
            d="M192,61.66V12m0,360V322.34M284.17,99.83l35.11-35.11M64.72,319.28l35.11-35.11m0-184.34L64.72,64.72M319.28,319.28l-35.11-35.11M61.66,192H12m360,0H322.34"
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="24"
          >
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="rotate"
              values="0 192 192; 45 192 192"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
        </symbol>
        <symbol id="f" viewBox="0 0 264 72" overflow="visible">
          <line
            x1="12"
            y1="60"
            x2="252"
            y2="60"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="24"
            stroke="url(#a)"
          >
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="translate"
              values="-24 0; 24 0; -24 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </line>
          <line
            x1="12"
            y1="12"
            x2="252"
            y2="12"
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="24"
            stroke="url(#b)"
          >
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="translate"
              values="24 0; -24 0; 24 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </line>
        </symbol>
      </defs>
      <g clipPath="url(#d)">
        <use width="384" height="384" transform="translate(64 100)" xlinkHref="#e" />
      </g>
      <use width="264" height="72" transform="translate(124 336)" xlinkHref="#f" />
    </svg>
  )
}

export default WeatherIconFogDay
