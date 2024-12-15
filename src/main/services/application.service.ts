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
}

export const applicationService = new ApplicationService()
