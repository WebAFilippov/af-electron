import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
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
  LayoutDashboardIcon,
  MemoryStickIcon,
  NetworkIcon,
  ServerIcon,
  type LucideIcon
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { NavUser } from './nav-user'

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
    href: '/'
  },
  {
    title: 'История обновлений',
    icon: FileText,
    href: '/'
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
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

        {/* <SidebarGroup>
          <SidebarGroupLabel>Дополнительно</SidebarGroupLabel>
          <SidebarMenu>
            {itemUpdates.map((item) => (
              <SidebarMenuItem key={item.href}>
                <NavLink to={item.href + 'dsad'} tabIndex={-1}>
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
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
