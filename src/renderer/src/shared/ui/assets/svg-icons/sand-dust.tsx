import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIconSandDust: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          x1="138.48"
          y1="5.12"
          x2="224.17"
          y2="153.53"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d4d7dd" />
          <stop offset="0.45" stopColor="#d4d7dd" />
          <stop offset="1" stopColor="#bec1c6" />
        </linearGradient>
        <linearGradient id="b" x1="77.66" y1="96.23" x2="168.99" y2="254.41" xlinkHref="#a" />
        <linearGradient
          id="c"
          x1="90"
          y1="185.61"
          x2="102"
          y2="206.39"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.45" stopColor="#fde68a" />
          <stop offset="1" stopColor="#fde171" />
        </linearGradient>
        <linearGradient id="d" x1="174" y1="185.61" x2="186" y2="206.39" xlinkHref="#c" />
        <linearGradient id="e" x1="258" y1="185.61" x2="270" y2="206.39" xlinkHref="#c" />
        <linearGradient id="f" x1="216" y1="245.61" x2="228" y2="266.39" xlinkHref="#c" />
        <linearGradient id="g" x1="300" y1="245.61" x2="312" y2="266.39" xlinkHref="#c" />
        <linearGradient id="h" x1="384" y1="245.61" x2="396" y2="266.39" xlinkHref="#c" />
        <linearGradient id="i" x1="166" y1="305.61" x2="178" y2="326.39" xlinkHref="#c" />
        <linearGradient id="j" x1="250" y1="305.61" x2="262" y2="326.39" xlinkHref="#c" />
        <linearGradient id="k" x1="334" y1="305.61" x2="346" y2="326.39" xlinkHref="#c" />
        <symbol id="l" viewBox="0 0 348 240">
          <path
            d="M267.16,24.29A40,40,0,1,1,296,92H12"
            fill="none"
            strokeDasharray="148"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="24"
            stroke="url(#a)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0; 2960"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>

          <path
            d="M151.16,215.71A40,40,0,1,0,180,148H12"
            fill="none"
            strokeDasharray="110"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="24"
            stroke="url(#b)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0; 1540"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
        </symbol>
      </defs>

      <g opacity="0">
        <circle cx="96" cy="196" r="12" fill="url(#c)" />

        <circle cx="222" cy="256" r="12" fill="url(#f)" />

        <circle cx="172" cy="316" r="12" fill="url(#i)" />

        <animateTransform
          id="x1"
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-24 0; 24 0"
          begin="1s; x1.end+1.17s"
          dur=".83s"
        />

        <animate
          id="y1"
          attributeName="opacity"
          values="0; 1; 1; 0"
          begin="1s; y1.end+1.17s"
          dur=".83s"
          keyTimes="0; .17; .83; 1"
        />
      </g>

      <g opacity="0">
        <circle cx="180" cy="196" r="12" fill="url(#d)" />

        <circle cx="306" cy="256" r="12" fill="url(#g)" />

        <circle cx="256" cy="316" r="12" fill="url(#j)" />

        <animateTransform
          id="x2"
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-24 0; 24 0"
          begin=".5s; x2.end+1.17s"
          dur=".83s"
        />

        <animate
          id="y2"
          attributeName="opacity"
          values="0; 1; 1; 0"
          begin=".5s; y2.end+1.17s"
          dur=".83s"
          keyTimes="0; .17; .83; 1"
        />
      </g>

      <g opacity="0">
        <circle cx="264" cy="196" r="12" fill="url(#e)" />

        <circle cx="390" cy="256" r="12" fill="url(#h)" />

        <circle cx="340" cy="316" r="12" fill="url(#k)" />

        <animateTransform
          id="x3"
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-24 0; 24 0"
          begin="0s; x3.end+1.17s"
          dur=".83s"
        />

        <animate
          id="y3"
          attributeName="opacity"
          values="0; 1; 1; 0"
          begin="0s; y3.end+1.17s"
          dur=".83s"
          keyTimes="0; .17; .83; 1"
        />
      </g>

      <use width="348" height="240" transform="translate(83 136)" xlinkHref="#l" />
    </svg>
  )
}

export default WeatherIconSandDust
