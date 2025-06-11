import changelogs from '../../../../../../changelog.json'
import { UpdatePanel } from '@entities/updater'
import { PageLayout } from '@shared/layout'
import { cn } from '@shared/lib'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  ScrollArea
} from '@shared/ui'

export const ChangelogPage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col justify-between h-full py-3 gap-3">
        <UpdatePanel />

        <ScrollArea className={cn('min-h-8/12 max-h-11/12 h-full pr-3')}>
          <Accordion type="multiple" defaultValue={[]} className="w-full select-none">
            {changelogs.map((changelog, index) => (
              <AccordionItem value={`item-${index}`} key={`item-${index}`}>
                <AccordionTrigger>
                  v.{changelog.version} {changelog.title} - [{changelog.date}]
                </AccordionTrigger>
                <AccordionContent>
                  {changelog.platform && (
                    <p className="flex flex-row gap-1 items-center">
                      {changelog.platform.map((platform) => {
                        return (
                          <Badge
                            key={platform}
                            variant="secondary"
                            className="px-1 text-xs font-mono"
                          >
                            {platform}
                          </Badge>
                        )
                      })}
                    </p>
                  )}
                  <ul className="ml-6 list-disc [&>li]:mt-2">
                    {changelog.changes.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                  {changelog.tags && (
                    <p className="flex flex-row gap-1 items-center pt-2">
                      {changelog.tags.map((tag) => {
                        return (
                          <Badge key={tag} variant="outline" className="px-1 text-xs font-mono">
                            #{tag}
                          </Badge>
                        )
                      })}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
    </PageLayout>
  )
}
