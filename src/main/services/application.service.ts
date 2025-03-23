import ping from 'ping'

import { IApplication } from '@models/application.model'

import { applicationRepository } from '@repositories/application.repository'

class ApplicationService {
  async getApplication(): Promise<IApplication> {
    const response = await applicationRepository.getApplication()

    return response
  }

  async updateApplicationField<T extends keyof Omit<IApplication, 'id'>>(
    field: T,
    value: IApplication[T]
  ): Promise<boolean> {
    const response = await applicationRepository.updateApplicationField(field, value)

    return response
  }

  async isHostReachable(host: string = '8.8.8.8'): Promise<boolean> {
    try {
      const { alive } = await ping.promise.probe(host)
      return alive
    } catch {
      return false
    }
  }
}

export const applicationService = new ApplicationService()
