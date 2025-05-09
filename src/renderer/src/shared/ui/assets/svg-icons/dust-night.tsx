import { FC } from 'react'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
}

const WeatherIconDustNight: FC<Props> = ({ width = 64, height = 64, className = '' }) => {
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
          x1="6"
          y1="169.61"
          x2="18"
          y2="190.39"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.45" stopColor="#fde68a" />
          <stop offset="1" stopColor="#fde171" />
        </linearGradient>
        <linearGradient id="b" x1="66" y1="169.61" x2="78" y2="190.39" xlinkHref="#a" />
        <linearGradient id="c" x1="38" y1="137.61" x2="50" y2="158.39" xlinkHref="#a" />
        <linearGradient id="d" x1="98" y1="137.61" x2="110" y2="158.39" xlinkHref="#a" />
        <linearGradient id="e" x1="70" y1="101.61" x2="82" y2="122.39" xlinkHref="#a" />
        <linearGradient id="f" x1="130" y1="101.61" x2="142" y2="122.39" xlinkHref="#a" />
        <linearGradient id="g" x1="102" y1="69.61" x2="114" y2="90.39" xlinkHref="#a" />
        <linearGradient id="h" x1="162" y1="69.61" x2="174" y2="90.39" xlinkHref="#a" />
        <linearGradient id="i" x1="134" y1="33.61" x2="146" y2="54.39" xlinkHref="#a" />
        <linearGradient id="j" x1="194" y1="33.61" x2="206" y2="54.39" xlinkHref="#a" />
        <linearGradient id="k" x1="166" y1="1.61" x2="178" y2="22.39" xlinkHref="#a" />
        <linearGradient id="l" x1="226" y1="1.61" x2="238" y2="22.39" xlinkHref="#a" />
        <linearGradient
          id="m"
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
        <clipPath id="n">
          <polygon points="0 0 512 0 0 512 0 0" fill="none" />
        </clipPath>
        <symbol id="o" viewBox="0 0 270 270" overflow="visible">
          <path
            d="M252.25,168.63C178.13,168.63,118,109.35,118,36.21A130.48,130.48,0,0,1,122.47,3C55.29,10.25,3,66.37,3,134.58,3,207.71,63.09,267,137.21,267,199.69,267,252,224.82,267,167.79A135.56,135.56,0,0,1,252.25,168.63Z"
            stroke="#72b9d5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            fill="url(#m)"
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
        <symbol id="p" viewBox="0 0 244 192">
          <circle cx="12" cy="180" r="12" fill="url(#a)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="72" cy="180" r="12" fill="url(#b)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.08s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="44" cy="148" r="12" fill="url(#c)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.16s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="104" cy="148" r="12" fill="url(#d)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.24s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="76" cy="112" r="12" fill="url(#e)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.32s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="136" cy="112" r="12" fill="url(#f)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.40s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="108" cy="80" r="12" fill="url(#g)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.48s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="168" cy="80" r="12" fill="url(#h)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.56s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="140" cy="44" r="12" fill="url(#i)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.64s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="200" cy="44" r="12" fill="url(#j)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.72s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="172" cy="12" r="12" fill="url(#k)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.80s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="232" cy="12" r="12" fill="url(#l)">
            <animate
              attributeName="opacity"
              values=".5; 1; .5"
              dur=".67s"
              begin="-1.88s"
              repeatCount="indefinite"
            />
          </circle>
        </symbol>
      </defs>
      <g clipPath="url(#n)">
        <use width="270" height="270" transform="translate(121 121)" xlinkHref="#o" />
      </g>
      <use width="244" height="192" transform="translate(192 182)" xlinkHref="#p" />
    </svg>
  )
}

export default WeatherIconDustNight
