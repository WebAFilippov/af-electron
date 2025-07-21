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
import { useState } from 'react'

const colors2 =
  '255,216,255;219,0,67;0,6,4;5,6,5;4,6,6;5,6,7;7,6,8;10,16,10;10,9,9;10,20,14;15,12,16;23,20,24;24,23,20;22,22,26;29,37,31;26,27,35;28,22,22;32,44,32;35,38,39;41,42,41;25,31,45;48,45,40;48,37,40;41,40,255;219,0,67;1,7,7;7,10,8;10,19,10;10,19,40;26,22,26;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,40;40,40,255;192,0,17;8,4,56;7,128,3;1,34,0;2,17,1;3,17,1;255,196,0;29,0,0;3,0,3;1,1,1;1,0,0;0,0,0;0,0,0'

export const ChangelogPage = () => {
  const [colors] = useState(colors2.split(';'))

  return (
    <div className="flex gap-2 flex-wrap">
      {colors.map((color) => {
        return (
          <div
            key={Math.random()}
            className={cn(`size-6`)}
            style={{ background: `rgb(${color})` }}
          ></div>
        )
      })}
    </div>
    // <PageLayout>
    //   <div className="flex flex-col justify-between h-full py-3 gap-3">
    //     <UpdatePanel />

    //     <ScrollArea className={cn('min-h-8/12 max-h-11/12 h-full pr-3')}>
    //       <Accordion type="multiple" defaultValue={[]} className="w-full select-none">
    //         {changelogs.map((changelog, index) => (
    //           <AccordionItem value={`item-${index}`} key={`item-${index}`}>
    //             <AccordionTrigger>
    //               v.{changelog.version} {changelog.title} - [{changelog.date}]
    //             </AccordionTrigger>
    //             <AccordionContent>
    //               {changelog.platform && (
    //                 <p className="flex flex-row gap-1 items-center">
    //                   {changelog.platform.map((platform) => {
    //                     return (
    //                       <Badge
    //                         key={platform}
    //                         variant="secondary"
    //                         className="px-1 text-xs font-mono"
    //                       >
    //                         {platform}
    //                       </Badge>
    //                     )
    //                   })}
    //                 </p>
    //               )}
    //               <ul className="ml-6 list-disc [&>li]:mt-2">
    //                 {changelog.changes.map((change) => (
    //                   <li key={change}>{change}</li>
    //                 ))}
    //               </ul>
    //               {changelog.tags && (
    //                 <p className="flex flex-row gap-1 items-center pt-2">
    //                   {changelog.tags.map((tag) => {
    //                     return (
    //                       <Badge key={tag} variant="outline" className="px-1 text-xs font-mono">
    //                         #{tag}
    //                       </Badge>
    //                     )
    //                   })}
    //                 </p>
    //               )}
    //             </AccordionContent>
    //           </AccordionItem>
    //         ))}
    //       </Accordion>
    //     </ScrollArea>
    //   </div>
    // </PageLayout>
  )
}
