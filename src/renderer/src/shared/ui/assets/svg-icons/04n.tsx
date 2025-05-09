import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIcon803_04n: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
        <linearGradient
          id="b"
          x1="52.74"
          y1="9.62"
          x2="133.36"
          y2="149.27"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9ca3af" />
          <stop offset="0.45" stopColor="#9ca3af" />
          <stop offset="1" stopColor="#6b7280" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="34.67"
          y1="18.56"
          x2="119.21"
          y2="164.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#86c3db" />
          <stop offset="0.45" stopColor="#86c3db" />
          <stop offset="1" stopColor="#5eafcf" />
        </linearGradient>
        <symbol id="e" viewBox="0 0 172 172">
          <path
            d="M160.62,107.4c-47.17,0-85.41-37.73-85.41-84.26A83.31,83.31,0,0,1,78,2C35.27,6.61,2,42.33,2,85.73,2,132.27,40.24,170,87.41,170A85.16,85.16,0,0,0,170,106.87,88,88,0,0,1,160.62,107.4Z"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            fill="url(#c)"
          >
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="rotate"
              values="-15 86 86; 9 86 86; -15 86 86"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
        </symbol>
        <symbol id="g" viewBox="0 0 200.26 126.12">
          <path
            d="M.5,93.18a32.44,32.44,0,0,0,32.44,32.44H162.69v-.12c.77,0,1.53.12,2.31.12a34.75,34.75,0,0,0,6.49-68.89A32.38,32.38,0,0,0,123,23.62,48.58,48.58,0,0,0,34.4,60.81c-.49,0-1-.07-1.46-.07A32.44,32.44,0,0,0,.5,93.18Z"
            stroke="#848b98"
            strokeMiterlimit="10"
            fill="url(#b)"
          />
        </symbol>
        <symbol id="h" viewBox="0 0 350 222">
          <path
            d="M291,107c-.85,0-1.68.09-2.53.13A83.9,83.9,0,0,0,135.6,42.92,55.91,55.91,0,0,0,51,91a56.56,56.56,0,0,0,.8,9.08A60,60,0,0,0,63,219c1.35,0,2.67-.11,4-.2v.2H291a56,56,0,0,0,0-112Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="6"
            fill="url(#a)"
          />
        </symbol>
        <symbol id="f" viewBox="0 0 398 222" overflow="visible">
          <use width="200.26" height="126.12" transform="translate(198 27)" xlinkHref="#g">
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="translate"
              values="-9 0; 9 0; -9 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </use>

          <use width="350" height="222" xlinkHref="#h">
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="translate"
              values="-18 0; 18 0; -18 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </use>
        </symbol>
        <symbol id="d" viewBox="0 0 398.84 246" overflow="visible">
          <use width="172" height="172" xlinkHref="#e" />
          <use width="398" height="222" transform="translate(0.84 24)" xlinkHref="#f" />
        </symbol>
      </defs>
      <use width="398.84" height="246" transform="translate(68 121)" xlinkHref="#d" />
    </svg>
  )
}

export default WeatherIcon803_04n
