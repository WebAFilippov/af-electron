import { ipcMain } from 'electron'

import { sidebarService } from '@services/Sidebar.service'

export const NavListController = () => {
  ipcMain.handle('v1/sidebar/getAll', async () => {
    const response = await sidebarService.getSidebar()
    return response
  })

  ipcMain.handle('v1/sidebar/updateSidebar', async (_event, list) => {
    await sidebarService.updateSidebarOrder(list)
  })
}
