import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIconFogNight: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          x1="54.33"
          y1="29.03"
          x2="187.18"
          y2="259.13"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#86c3db" />
          <stop offset="0.45" stopColor="#86c3db" />
          <stop offset="1" stopColor="#5eafcf" />
        </linearGradient>
        <clipPath id="d">
          <rect width="512" height="306" fill="none" />
        </clipPath>
        <symbol id="e" viewBox="0 0 270 270">
          <path
            d="M252.25,168.63C178.13,168.63,118,109.35,118,36.21A130.48,130.48,0,0,1,122.47,3C55.29,10.25,3,66.37,3,134.58,3,207.71,63.09,267,137.21,267,199.69,267,252,224.82,267,167.79A135.56,135.56,0,0,1,252.25,168.63Z"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            fill="url(#c)"
          >
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="rotate"
              values="-15 135 135; 9 135 135; -15 135 135"
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
        <use width="270" height="270" transform="translate(121 121)" xlinkHref="#e" />
      </g>
      <use width="264" height="72" transform="translate(124 336)" xlinkHref="#f" />
    </svg>
  )
}

export default WeatherIconFogNight
