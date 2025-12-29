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
      <div className="relative flex h-screen w-screen flex-col gap-0 overflow-hidden">
        <WindowFrame />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="bg-background flex h-12 shrink-0 items-center gap-2 border-b">
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
            <main className="p-4">
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}
