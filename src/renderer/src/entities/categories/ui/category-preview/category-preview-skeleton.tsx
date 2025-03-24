import { FC } from 'react'

import { Skeleton } from '@shared/ui'

export const CategoryPreviewSkeleton: FC = (props) => {
  return <Skeleton className='h-32 rounded-xl' {...props} />
}
