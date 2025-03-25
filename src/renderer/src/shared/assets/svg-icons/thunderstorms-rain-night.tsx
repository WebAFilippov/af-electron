import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const ThunderstormsRainNight: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          x1="8.67"
          y1="17.07"
          x2="80.88"
          y2="142.14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f7b23b" />
          <stop offset="0.45" stopColor="#f7b23b" />
          <stop offset="1" stopColor="#f59e0b" />
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
        <linearGradient
          id="d"
          x1="1381.32"
          y1="-1144.67"
          x2="1399.47"
          y2="-1097.39"
          gradientTransform="translate(-1189.41 1353.24) rotate(-9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0b65ed" />
          <stop offset="0.45" stopColor="#0a5ad4" />
          <stop offset="1" stopColor="#0950bc" />
        </linearGradient>
        <linearGradient
          id="e"
          x1="1436.71"
          y1="-1137"
          x2="1454.86"
          y2="-1089.72"
          gradientTransform="translate(-1189.32 1354.33) rotate(-9)"
          xlinkHref="#d"
        />
        <linearGradient
          id="f"
          x1="1492.12"
          y1="-1129.34"
          x2="1510.27"
          y2="-1082.06"
          gradientTransform="translate(-1189.24 1355.43) rotate(-9)"
          xlinkHref="#d"
        />
        <symbol id="h" viewBox="0 0 172 172">
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
        <symbol id="i" viewBox="0 0 350 222">
          <path
            d="M291,107c-.85,0-1.68.09-2.53.13A83.9,83.9,0,0,0,135.6,42.92,55.91,55.91,0,0,0,51,91a56.56,56.56,0,0,0,.8,9.08A60,60,0,0,0,63,219c1.35,0,2.67-.11,4-.2v.2H291a56,56,0,0,0,0-112Z"
            stroke="#e6effc"
            strokeMiterlimit="10"
            strokeWidth="6"
            fill="url(#a)"
          />
        </symbol>
        <symbol id="g" viewBox="0 0 351 246">
          <use width="172" height="172" xlinkHref="#h" />
          <use width="350" height="222" transform="translate(1 24)" xlinkHref="#i" />
        </symbol>
        <symbol id="j" viewBox="0 0 129 57" overflow="visible">
          <path
            d="M8.5,56.5a8,8,0,0,1-8-8V8.5a8,8,0,0,1,16,0v40A8,8,0,0,1,8.5,56.5Z"
            stroke="#0a5ad4"
            strokeMiterlimit="10"
            fill="url(#d)"
            opacity="0"
          >
            <animateTransform
              id="x1"
              attributeName="transform"
              additive="sum"
              type="translate"
              values="0 -60; 0 60"
              begin="0s; x1.end+.33s"
              dur=".67s"
            />

            <animate
              id="y1"
              attributeName="opacity"
              values="0; 1; 0"
              begin="0s; y1.end+.33s"
              dur=".67s"
              keyTimes="0; .25; 1"
            />
          </path>

          <path
            d="M64.5,56.5a8,8,0,0,1-8-8V8.5a8,8,0,0,1,16,0v40A8,8,0,0,1,64.5,56.5Z"
            stroke="#0a5ad4"
            strokeMiterlimit="10"
            fill="url(#e)"
            opacity="0"
          >
            <animateTransform
              id="x2"
              attributeName="transform"
              additive="sum"
              type="translate"
              values="0 -60; 0 60"
              begin=".33s; x2.end+.33s"
              dur=".67s"
            />

            <animate
              id="y2"
              attributeName="opacity"
              values="0; 1; 0"
              begin=".33s; y2.end+.33s"
              dur=".67s"
              keyTimes="0; .25; 1"
            />
          </path>

          <path
            d="M120.5,56.5a8,8,0,0,1-8-8V8.5a8,8,0,0,1,16,0v40A8,8,0,0,1,120.5,56.5Z"
            stroke="#0a5ad4"
            strokeMiterlimit="10"
            fill="url(#f)"
            opacity="0"
          >
            <animateTransform
              id="x3"
              attributeName="transform"
              additive="sum"
              type="translate"
              values="0 -60; 0 60"
              begin="-.33s; x3.end+.33s"
              dur=".67s"
            />

            <animate
              id="y3"
              attributeName="opacity"
              values="0; 1; 0"
              begin="-.33s; y3.end+.33s"
              dur=".67s"
              keyTimes="0; .25; 1"
            />
          </path>
        </symbol>
        <symbol id="k" viewBox="0 0 102.66 186.75">
          <polygon
            points="34.77 2 2.77 98 34.77 98 18.77 178 98.78 66 50.77 66 82.78 2 34.77 2"
            stroke="#f6a823"
            strokeMiterlimit="10"
            strokeWidth="4"
            fill="url(#b)"
          >
            <animate
              id="x1"
              attributeName="opacity"
              values="1; 1; 0; 1; 0; 1; 0; 1"
              begin="0s; x1.end+.67s"
              dur="1.33s"
              keyTimes="0; .38; .5; .63; .75; .86; .94; 1"
            />
          </polygon>
        </symbol>
      </defs>
      <use width="351" height="246" transform="translate(80 121)" xlinkHref="#g" />
      <use width="129" height="57" transform="translate(191.5 343.5)" xlinkHref="#j" />
      <use width="102.66" height="186.74" transform="translate(205.23 291)" xlinkHref="#k" />
    </svg>
  )
}

export default ThunderstormsRainNight
