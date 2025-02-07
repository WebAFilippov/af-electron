import { ISidebar } from '@models/Sidebar.model'

import { sidebarRepository } from '@repositories/Sidebar.repository'

class SidebarService {
  async getSidebar(): Promise<ISidebar[]> {
    const response = await sidebarRepository.getSidebar()
    return response
  }

  async updateSidebarOrder(list: ISidebar[]): Promise<void> {
    await sidebarRepository.updateSidebarOrder(list)
  }
}

export const sidebarService = new SidebarService()
