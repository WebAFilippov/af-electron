import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIcon803_04d: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          x1="78"
          y1="63.35"
          x2="118"
          y2="132.65"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="0.45" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <symbol id="e" viewBox="0 0 196 196">
          <circle
            cx="98"
            cy="98"
            r="40"
            stroke="#f8af18"
            strokeMiterlimit="10"
            strokeWidth="4"
            fill="url(#c)"
          />

          <path
            d="M98,31.38V6m0,184V164.62M145.11,50.89,163.05,33M33,163.05l17.94-17.94m0-94.22L33,33m130.1,130.1-17.94-17.94M6,98H31.38M190,98H164.62"
            fill="none"
            stroke="#fbbf24"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="12"
          >
            <animateTransform
              attributeName="transform"
              additive="sum"
              type="rotate"
              values="0 98 98; 45 98 98"
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
        <symbol id="d" viewBox="0 0 410.84 258" overflow="visible">
          <use width="196" height="196" xlinkHref="#e" />
          <use width="398" height="222" transform="translate(12.84 36)" xlinkHref="#f" />
        </symbol>
      </defs>
      <use width="410.84" height="258" transform="translate(56 109)" xlinkHref="#d" />
    </svg>
  )
}

export default WeatherIcon803_04d
