// import { UniqueIdentifier } from '@dnd-kit/core'
// import { useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'

// import { SidebarItem } from './sidebar-item'

// interface WrapperSidebarItemProps {
//   id: UniqueIdentifier
// }

// export function WrapperSidebarItem({ id, ...props }: WrapperSidebarItemProps) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition
//   }

//   return (
//     <SidebarItem ref={setNodeRef} style={style} {...attributes} {...listeners} id={id} {...props} />
//   )
// }
