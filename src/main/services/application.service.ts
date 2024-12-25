import ping from 'ping'

import { IApplication } from '@models/application.model'

import { applicationRepository } from '@repositories/application.repository'

class ApplicationService {
  async getApplication() {
    const response = await applicationRepository.getAll()

    return response
  }

  async updateApplication(field: keyof Omit<IApplication, 'id'>, value: string) {
    const response = await applicationRepository.updateApplicationForFieldByValue(field, value)

    return response
  }

  async checkConnection() {
    try {
      const result = await ping.promise.probe('8.8.8.8')
      if (result.alive) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error('Error checking connection')
    }
  }
}

export const applicationService = new ApplicationService()
