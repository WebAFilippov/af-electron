import { CHANGELOG } from '@shared/changelog'
import { ScrollArea } from '@shared/ui'
import { formatDate } from '@shared/utils/formatDate'

export const ChangelogList = () => {
  return (
    <ScrollArea className="h-80">
      <div className="flex flex-col divide-y">
        {CHANGELOG.map((item) => {
          return (
            <div
              className="flex select-none flex-col gap-2 rounded-sm px-4 py-4 pt-2 text-sm outline-none"
              key={item.version}
            >
              <div className="flex flex-col items-start justify-between">
                <span className="text-sm font-bold">{item.version}</span>
                <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
              </div>
              {item.description && (
                <ul className="text-xs text-foreground">
                  {item.description.map((description) => {
                    return <li key={description}>{description}</li>
                  })}
                </ul>
              )}
              {item.changelog && (
                <ul className="space-y list-outside list-disc pl-4 text-xs font-normal text-muted-foreground">
                  {item.changelog.map((changelog) => {
                    return <li key={changelog}>{changelog}</li>
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
