import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIconHazeNight: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          x1="17.25"
          y1="43.11"
          x2="89.25"
          y2="167.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d4d7dd" />
          <stop offset="0.45" stopColor="#d4d7dd" />
          <stop offset="1" stopColor="#bec1c6" />
        </linearGradient>
        <linearGradient id="b" x1="107.25" y1="-8.85" x2="179.25" y2="115.86" xlinkHref="#a" />
        <linearGradient id="c" x1="174.75" y1="-47.82" x2="246.75" y2="76.89" xlinkHref="#a" />
        <linearGradient id="d" y1="-4.89" x2="89.25" y2="119.82" xlinkHref="#a" />
        <linearGradient id="e" x1="107.25" y1="-56.85" x2="179.25" y2="67.86" xlinkHref="#a" />
        <linearGradient id="f" x1="174.75" y1="-95.82" x2="246.75" y2="28.89" xlinkHref="#a" />
        <linearGradient
          id="g"
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
        <clipPath id="h">
          <rect width="512" height="306" fill="none" />
        </clipPath>
        <symbol id="i" viewBox="0 0 270 270">
          <path
            d="M252.25,168.63C178.13,168.63,118,109.35,118,36.21A130.48,130.48,0,0,1,122.47,3C55.29,10.25,3,66.37,3,134.58,3,207.71,63.09,267,137.21,267,199.69,267,252,224.82,267,167.79A135.56,135.56,0,0,1,252.25,168.63Z"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            fill="url(#g)"
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
        <symbol id="j" viewBox="0 0 264 72" overflow="visible">
          <g>
            <line
              x1="12"
              y1="60"
              x2="42"
              y2="60"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="24"
              stroke="url(#a)"
            />
            <line
              x1="102"
              y1="60"
              x2="192"
              y2="60"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="24"
              strokeDasharray="60 60"
              stroke="url(#b)"
            />
            <line
              x1="222"
              y1="60"
              x2="252"
              y2="60"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="24"
              stroke="url(#c)"
            />

            <animateTransform
              attributeName="transform"
              additive="sum"
              type="translate"
              values="-24 0; 24 0; -24 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </g>
          <g>
            <line
              x1="12"
              y1="12"
              x2="42"
              y2="12"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="24"
              stroke="url(#d)"
            />
            <line
              x1="102"
              y1="12"
              x2="192"
              y2="12"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="24"
              strokeDasharray="60 60"
              stroke="url(#e)"
            />
            <line
              x1="222"
              y1="12"
              x2="252"
              y2="12"
              fill="none"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="24"
              stroke="url(#f)"
            />

            <animateTransform
              attributeName="transform"
              additive="sum"
              type="translate"
              values="24 0; -24 0; 24 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </g>
        </symbol>
      </defs>
      <g clipPath="url(#h)">
        <use width="270" height="270" transform="translate(121 121)" xlinkHref="#i" />
      </g>
      <use width="264" height="72" transform="translate(124 336)" xlinkHref="#j" />
    </svg>
  )
}

export default WeatherIconHazeNight
