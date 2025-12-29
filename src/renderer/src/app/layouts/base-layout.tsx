import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
      <div className="relative flex h-screen w-screen flex-col overflow-hidden">
        <WindowFrame />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="bg-background sticky top-0 z-20 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
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
            <main className="flex flex-1 flex-col p-4 pr-1">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
