import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarSeparator } from './sidebar'

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar" className="">
      <SidebarHeader>
        <SidebarContent>Header</SidebarContent>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>Sidebar Content</SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarContent>Footer</SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}
