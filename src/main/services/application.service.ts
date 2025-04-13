import ping from 'ping'

import { ApplicationModel } from '@models/application.model'

import { applicationRepository } from '@repositories/application.repository'

class ApplicationService {
  async getApplication(): Promise<Omit<ApplicationModel, 'id'>> {
    const response = await applicationRepository.getApplication()

    return response
  }

  async updateApplicationField<T extends keyof Omit<ApplicationModel, 'id'>>(
    field: T,
    value: ApplicationModel[T]
  ): Promise<boolean> {
    const response = await applicationRepository.updateApplicationField(field, value)

    return response
  }

  async isHostReachable(host: string): Promise<boolean> {
    try {
      const { alive } = await ping.promise.probe(host)
      return alive
    } catch {
      return false
    }
  }
}

export const applicationService = new ApplicationService()
