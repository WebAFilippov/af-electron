import { FC } from 'react'

import { Skeleton } from '@shared/ui'

export const CategoryPreviewSkeleton: FC = (props) => {
  return <Skeleton className="h-24 rounded-xl" {...props} />
}
