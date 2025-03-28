import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIconTornado: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          y1="97.65"
          x2="292"
          y2="222.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d4d7dd" />
          <stop offset="0.45" stopColor="#d4d7dd" />
          <stop offset="1" stopColor="#bec1c6" />
        </linearGradient>
        <linearGradient id="b" x1="224" y1="152.57" x2="288" y2="263.43" xlinkHref="#a" />
        <linearGradient id="c" x1="229" y1="209.23" x2="283" y2="302.77" xlinkHref="#a" />
        <linearGradient id="d" x1="234" y1="265.89" x2="278" y2="342.11" xlinkHref="#a" />
        <linearGradient id="e" x1="242" y1="327.75" x2="270" y2="376.25" xlinkHref="#a" />
      </defs>

      <line
        x1="136"
        y1="160"
        x2="376"
        y2="160"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="24"
        stroke="url(#a)"
      >
        <animateTransform
          id="x2"
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-12 0; 12 0; -12 0"
          dur="3s"
          calcMode="spline"
          keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
          repeatCount="indefinite"
        />
      </line>

      <line
        x1="152"
        y1="208"
        x2="360"
        y2="208"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="24"
        stroke="url(#b)"
      >
        <animateTransform
          id="x2"
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-24 0; 24 0; -24 0"
          dur="3s"
          calcMode="spline"
          keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
          repeatCount="indefinite"
        />
      </line>

      <line
        x1="172"
        y1="256"
        x2="340"
        y2="256"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="24"
        stroke="url(#c)"
      >
        <animateTransform
          id="x2"
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-36 0; 36 0; -36 0"
          dur="3s"
          calcMode="spline"
          keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
          repeatCount="indefinite"
        />
      </line>

      <line
        x1="192"
        y1="304"
        x2="320"
        y2="304"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="24"
        stroke="url(#d)"
      >
        <animateTransform
          id="x2"
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-48 0; 48 0; -48 0"
          dur="3s"
          calcMode="spline"
          keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
          repeatCount="indefinite"
        />
      </line>

      <line
        x1="224"
        y1="352"
        x2="288"
        y2="352"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="24"
        stroke="url(#e)"
      >
        <animateTransform
          id="x2"
          attributeName="transform"
          additive="sum"
          type="translate"
          values="-60 0; 60 0; -60 0"
          dur="3s"
          calcMode="spline"
          keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  )
}

export default WeatherIconTornado
