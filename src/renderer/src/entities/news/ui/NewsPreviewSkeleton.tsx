import { Card, CardHeader, Separator, Skeleton } from '@shared/ui'

export const NewsPreviewSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex select-none flex-row gap-2 p-3">
        <Skeleton className="m-1 h-36 w-36 flex-shrink-0 rounded-md" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-6 w-3/4 rounded-md" /> {/* Заголовок */}
          <Skeleton className="h-12 w-full rounded-md" /> {/* Описание */}
          <div className="flex gap-2">
            <Skeleton className="h-4 w-20 rounded-md" /> {/* Дата */}
            <Separator orientation="vertical" />
            <Skeleton className="h-4 w-24 rounded-md" /> {/* Категория */}
            <Separator orientation="vertical" />
            <Skeleton className="h-4 w-20 rounded-md" /> {/* Автор */}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
