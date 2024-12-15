import { applicationRepository } from '@repositories/application.repository'

class ApplicationService {
  async getApplication() {
    const response = await applicationRepository.getAll()

    return response
  }

  async updateApplication(value: string) {
    const response = await applicationRepository.updateApplicationForFieldByValue(
      'openweathermap_apikey',
      value
    )

    return response
  }
}

export const applicationService = new ApplicationService()
