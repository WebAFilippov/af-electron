import { Transaction } from 'sequelize'

import Sidebar, { ISidebar } from '@models/Sidebar.model'

class SidebarRepository {
  async getSidebar(): Promise<ISidebar[]> {
    const list = await Sidebar.findAll({ order: [[`order`, 'ASC']], raw: true })

    return list
  }

  async updateSidebarOrder(list: ISidebar[]): Promise<void> {
    const transaction: Transaction = await Sidebar.sequelize!.transaction()

    try {
      for (const item of list) {
        await Sidebar.update(
          {
            order: item.order
          },
          {
            where: { id: item.id },
            transaction
          }
        )
      }
      await transaction.commit()
    } catch (error) {
      transaction.rollback()
      throw error
    }
  }
}

export const sidebarRepository = new SidebarRepository()
