// import { useUnit } from 'effector-react'

// import { useDebugLayer } from '@entities/debug-mode/ui/use-debug-layer'

// import { cn } from '@shared/lib'

// import { $sidebar } from '../model/sidebar'
// import { SidebarNav } from './SidebarNav/sidebar-nav'

// export const Sidebar = () => {
//   const isOpenSidebar = useUnit($sidebar)
//   const { ref } = useDebugLayer<HTMLDivElement>('widgets')

//   return (
//     <aside
//       ref={ref}
//       className={cn(
//         'wallpaper transition-[width, height] relative z-10 flex h-full flex-col border-r border-dashed border-primary duration-300',
//         isOpenSidebar ? 'w-[15rem]' : 'w-[5rem]'
//       )}
//     >
//       <div className="relative h-[4rem] border-b border-dashed border-primary bg-background">
//         Logo
//       </div>

//       <SidebarNav />

//       <div className="h-[3rem] border-t border-dashed border-primary bg-background">footer</div>
//     </aside>
//   )
// }
