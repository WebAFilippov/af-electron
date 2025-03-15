import { FC, PropsWithChildren } from 'react'

export const TypographyBlockquote: FC<PropsWithChildren> = ({ children }) => {
  return <blockquote className="mx-auto my-6 w-11/12 border-l-4 pl-6 italic">{children}</blockquote>
}

export const TypographyBlockquoteContent: FC<PropsWithChildren> = ({ children }) => {
  return <p className="text-center text-base font-semibold leading-snug">{children}</p>
}

export const TypographyBlockquoteAuthor: FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="text-center text-sm leading-none [&:last-child]:text-xs [&:last-child]:text-muted-foreground [&:nth-last-child(2)]:mt-4">
      {children}
    </p>
  )
}
