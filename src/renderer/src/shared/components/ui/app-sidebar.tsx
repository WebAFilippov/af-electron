import { PlusCircle } from 'lucide-react'
import { Link } from 'react-router'

import logo from '@shared/assets/logo.png'
import { ROUTE } from '@shared/config/routes'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator
} from './sidebar'

logo

const projects = [
  { icon: <PlusCircle />, name: 'Погода' },
  { icon: <PlusCircle />, name: 'Стол' },
  { icon: <PlusCircle />, name: 'Подсветка монитора' },
  { icon: <PlusCircle />, name: 'Подсветка стола' },
  { icon: <PlusCircle />, name: 'Громкость OS' }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarHeader className="p-0 pb-2 pt-2">
        <SidebarMenuButton
          className="h-8 cursor-default p-0 pl-2 user-select-none hover:bg-sidebar hover:text-sidebar-primary active:bg-sidebar group-data-[collapsible=icon]:!w-12 group-data-[collapsible=icon]:!pl-2 [&>img]:size-8 [&>svg]:shrink-0"
          size="lg"
          asChild
        >
          <div>
            <img src={logo} alt="" className="" />
            <span className="text-2xl">Harmonify</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.WEATHER.path}>
                    <PlusCircle />
                    <span>{ROUTE.WEATHER.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem><SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={ROUTE.TABLE.path}>
                    <PlusCircle />
                    <span>Стол</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-0 pb-6">
        <SidebarMenuButton
          className="cursor-default justify-center group-data-[collapsible=icon]:!size-12 group-data-[collapsible=icon]:!pl-2 [&>img]:size-8 [&>svg]:shrink-0"
          size="lg"
        >
          <img src={logo} alt="" className="" />
          <span className="text-lg">Harmonify</span>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
