interface Props {
  children: React.ReactNode
  leftSlot?: React.ReactNode
}

export const PageLayout = ({ children, leftSlot }: Props) => {
  return (
    <div className="w-full">
      <div>{leftSlot}</div>
      {children}
    </div>
  )
}
