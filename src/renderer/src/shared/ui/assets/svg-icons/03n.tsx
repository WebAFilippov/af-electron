import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIcon802_03n: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          x1="99.45"
          y1="30.68"
          x2="232.64"
          y2="261.37"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f3f7fe" />
          <stop offset="0.45" stopColor="#f3f7fe" />
          <stop offset="1" stopColor="#deeafb" />
        </linearGradient>
        <symbol id="b" viewBox="0 0 350 222">
          <path
            d="M291,107c-.85,0-1.68.09-2.53.13A83.9,83.9,0,0,0,135.6,42.92,55.91,55.91,0,0,0,51,91a56.56,56.56,0,0,0,.8,9.08A60,60,0,0,0,63,219c1.35,0,2.67-.11,4-.2v.2H291a56,56,0,0,0,0-112Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="6"
            fill="url(#a)"
          />
        </symbol>
      </defs>
      <use width="350" height="222" transform="translate(81 145)" xlinkHref="#b">
        <animateTransform
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-18 0; 18 0; -18 0"
          dur="6s"
          repeatCount="indefinite"
        />
      </use>
    </svg>
  )
}

export default WeatherIcon802_03n
