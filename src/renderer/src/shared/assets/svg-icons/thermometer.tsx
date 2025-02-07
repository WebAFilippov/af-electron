import { FC, SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string | number
}

export const Thermometer: FC<IconProps> = ({ size = '1.5rem', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a2 2 0 0 1 2 2v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 2-2Z" />
    </svg>
  )
}


