// import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react'
import { Link } from 'react-router'

import { $sidebar, toggleSidebar } from '@widgets/sidebar'

import { LanguageSwitcher } from '@features/language-switcher/ui/LanguageSwitcher'
import { ThemeSwitcher } from '@features/theme-switcher/ui/ThemeSwither'

import { useDebugLayer } from '@entities/debug-mode'

import { Button, RainbowButton } from '@shared/ui'

export const Header = () => {
  const { ref: refButton } = useDebugLayer<HTMLButtonElement>('shared')

  const isOpen = useUnit($sidebar)
  const handleToggleSidebar = useUnit(toggleSidebar)

  const isOnline = true

  return (
    <div className="relative my-auto flex min-h-12 w-full items-center justify-between bg-transparent px-20">
      <div className="absolute left-2 top-0 flex h-12 w-8 items-center justify-center">
        <Button ref={refButton} variant="outline" onClick={handleToggleSidebar} className="h-8 w-8">
          {isOpen ? <PanelLeftCloseIcon size="1rem" /> : <PanelLeftOpenIcon size="1rem" />}
        </Button>
      </div>

      <Link to="/">
        <RainbowButton className="h-9 select-none px-6">
          🚀a.filippov
          <span className="italic">/ui</span>
        </RainbowButton>
      </Link>

      <div className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="relative inline-flex size-2 rounded-full bg-green-500/30"></span>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full  bg-green-400 opacity-75 "></span>
        </span>
        <ThemeSwitcher />
      </div>
    </div>
  )
}
