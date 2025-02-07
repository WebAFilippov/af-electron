import { FC, PropsWithChildren } from 'react'

export const TablePage: FC<PropsWithChildren<{ className?: string }>> = ({
  className
}) => {
  return <div className={className}>TablePage</div>
}
