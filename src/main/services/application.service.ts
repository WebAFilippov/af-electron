import { applicationRepository } from '@repositories/application.repository'

class ApplicationService {
  async getApplicationSettings() {
    const response = await applicationRepository.getAll()

    return response
  }

  async updateOpenWeatherMapApiKey(value: string) {
    const response = await applicationRepository.updateValueForOpenWeatherMapApiKey(value)

    return response
  }
}

export const applicationService = new ApplicationService()
