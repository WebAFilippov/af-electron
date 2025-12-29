import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@shared/ui'
import {
  ActivityIcon,
  CpuIcon,
  FileText,
  Gauge,
  HardDriveIcon,
  Info,
  MemoryStickIcon,
  NetworkIcon,
  ServerIcon,
  type LucideIcon
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { NavUser } from './nav-user'
import { useUnit } from 'effector-react'
import { $windowFullscreen } from '@shared/model'
import { cn } from '@shared/lib'

const itemMonitoring: {
  title: string
  icon: LucideIcon
  href: string
}[] = [
  {
    title: 'Обзор',
    icon: Gauge,
    href: '/'
  },
  {
    title: 'Процессор',
    icon: CpuIcon,
    href: '/cpu'
  },
  {
    title: 'Оперативная память',
    icon: MemoryStickIcon,
    href: '/memory'
  },
  {
    title: 'Диск',
    icon: HardDriveIcon,
    href: '/disk'
  },
  {
    title: 'Сеть',
    icon: NetworkIcon,
    href: '/network'
  },
  {
    title: 'UDP',
    icon: NetworkIcon,
    href: '/udp'
  },
  {
    title: 'Системная информация',
    icon: Info,
    href: '/systeminfo'
  },
  {
    title: 'Процессы',
    icon: ActivityIcon,
    href: '/processes'
  }
]

const itemUpdates: {
  title: string
  icon: LucideIcon
  href: string
}[] = [
  {
    title: 'Обновления',
    icon: ServerIcon,
    href: '/updates'
  },
  {
    title: 'История обновлений',
    icon: FileText,
    href: '/updates/history'
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [windowFullscreen] = useUnit([$windowFullscreen])

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className={cn(
        windowFullscreen ? 'top-0 h-screen' : 'top-9 h-[calc(100vh-36px)]'
      )}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>header</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Мониторинг</SidebarGroupLabel>
          <SidebarMenu>
            {itemMonitoring.map((item) => (
              <SidebarMenuItem key={item.href}>
                <NavLink to={item.href} tabIndex={-1}>
                  {({ isActive }) => (
                    <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Дополнительно</SidebarGroupLabel>
          <SidebarMenu>
            {itemUpdates.map((item) => (
              <SidebarMenuItem key={item.href}>
                <NavLink to={item.href} tabIndex={-1}>
                  {({ isActive }) => (
                    <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
