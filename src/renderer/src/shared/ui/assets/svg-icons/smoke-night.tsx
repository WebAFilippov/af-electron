import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIconSmokeNight: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
        <linearGradient
          id="c"
          x1="74"
          y1="165.21"
          x2="98"
          y2="206.79"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#b8bdc6" />
          <stop offset="0.45" stopColor="#b8bdc6" />
          <stop offset="1" stopColor="#a5aab2" />
        </linearGradient>
        <symbol id="g" viewBox="0 0 172 172">
          <path
            d="M160.62,107.4c-47.17,0-85.41-37.73-85.41-84.26A83.31,83.31,0,0,1,78,2C35.27,6.61,2,42.33,2,85.73,2,132.27,40.24,170,87.41,170A85.16,85.16,0,0,0,170,106.87,88,88,0,0,1,160.62,107.4Z"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            fill="url(#b)"
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
        <symbol id="h" viewBox="0 0 350 222">
          <path
            d="M291,107c-.85,0-1.68.09-2.53.13A83.9,83.9,0,0,0,135.6,42.92,55.91,55.91,0,0,0,51,91a56.56,56.56,0,0,0,.8,9.08A60,60,0,0,0,63,219c1.35,0,2.67-.11,4-.2v.2H291a56,56,0,0,0,0-112Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="6"
            fill="url(#a)"
          />
        </symbol>
        <symbol id="f" viewBox="0 0 351 246">
          <use width="172" height="172" xlinkHref="#g" />
          <use width="350" height="222" transform="translate(1 24)" xlinkHref="#h" />
        </symbol>
        <symbol id="i" viewBox="0 0 168 212" overflow="visible">
          <circle
            cx="86"
            cy="186"
            r="24"
            stroke="#afb4bc"
            strokeMiterlimit="10"
            strokeWidth="4"
            fill="url(#c)"
            opacity="0"
          >
            <animateTransform
              id="x1"
              attributeName="transform"
              additive="sum"
              type="translate"
              values="0 0; -58 -118"
              begin="0s; x1.end+.75s"
              dur="2.25s"
            />

            <animate
              id="y1"
              attributeName="r"
              values="24; 36"
              begin="0s; y1.end+.75s"
              dur="2.25s"
            />

            <animate
              id="z1"
              attributeName="opacity"
              values="0; 1; 1; 0"
              begin="0s; y1.end+.75s"
              dur="2.25s"
              keyTimes="0; .17; .83; 1"
            />
          </circle>
          <circle
            cx="86"
            cy="186"
            r="24"
            stroke="#afb4bc"
            strokeMiterlimit="10"
            strokeWidth="4"
            fill="url(#c)"
            opacity="0"
          >
            <animateTransform
              id="x2"
              attributeName="transform"
              additive="sum"
              type="translate"
              values="0 0; 58 -118"
              begin=".83s; x2.end+.75s"
              dur="2.25s"
            />

            <animate
              id="y2"
              attributeName="r"
              values="24; 36"
              begin=".83s; y2.end+.75s"
              dur="2.25s"
            />

            <animate
              id="z2"
              attributeName="opacity"
              values="0; 1; 1; 0"
              begin=".83s; z2.end+.75s"
              dur="2.25s"
              keyTimes="0; .17; .83; 1"
            />
          </circle>
          <circle
            cx="86"
            cy="186"
            r="24"
            stroke="#afb4bc"
            strokeMiterlimit="10"
            strokeWidth="4"
            fill="url(#c)"
            opacity="0"
          >
            <animateTransform
              id="x3"
              attributeName="transform"
              additive="sum"
              type="translate"
              values="0 0; 0 -118"
              begin="1.66s; x3.end+.75s"
              dur="2.25s"
            />

            <animate
              id="y3"
              attributeName="r"
              values="24; 36"
              begin="1.66s; y3.end+.75s"
              dur="2.25s"
            />

            <animate
              id="z3"
              attributeName="opacity"
              values="0; 1; 1; 0"
              begin="1.66s; z3.end+.75s"
              dur="2.25s"
              keyTimes="0; .17; .83; 1"
            />
          </circle>
        </symbol>
      </defs>
      <use width="351" height="246" transform="translate(80 121)" xlinkHref="#f" />
      <use width="168" height="212" transform="translate(172 232)" xlinkHref="#i" />
    </svg>
  )
}

export default WeatherIconSmokeNight
