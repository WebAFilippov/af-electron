import { useUnit } from 'effector-react'
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react'

import { cn } from '@shared/lib'
import { Button } from '@shared/ui'

import { $isCollapsedSidebar, toggleSidebar } from '../model/sidebar'

export const ToggleSidebar = () => {
  const [isCollapsed, handleToggleSidebar] = useUnit([$isCollapsedSidebar, toggleSidebar])

  return (
    <Button
      variant="outline"
      className="relative h-8 w-8 overflow-hidden"
      onClick={() => handleToggleSidebar()}
    >
      <PanelLeftCloseIcon
        size="1rem"
        className={cn(
          'absolute scale-100 text-foreground transition-colors',
          isCollapsed && 'scale-0'
        )}
      />
      <PanelLeftOpenIcon
        size="1rem"
        className={cn(
          'absolute scale-0 text-foreground transition-colors',
          isCollapsed && 'scale-100'
        )}
      />
    </Button>
  )
}
