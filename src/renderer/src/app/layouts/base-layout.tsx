import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  ScrollArea,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@shared/ui'

import { Outlet } from 'react-router-dom'
import { AppSidebar } from './app-sidebar'
import { ThemeProvider } from '@shared/model/theme-provider'
import { WindowFrame } from '@widgets/window-frame'

export const Baselayout = () => {
  return (
    <ThemeProvider storageKey="ui-theme">
      <WindowFrame />
      <div className="relative flex w-full flex-col">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center gap-2 overflow-hidden border-b transition-[width,height] ease-linear">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      {/* <BreadcrumbLink href="#">Мониторинг</BreadcrumbLink> */}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Обзор</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className="flex flex-1 flex-col overflow-hidden p-4 pr-1">
              <ScrollArea className="h-[calc(100vh-7.5rem)] pr-3 transition-[width,height]">
                <Outlet />
              </ScrollArea>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
