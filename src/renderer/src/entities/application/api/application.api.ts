import { useQuery } from '@tanstack/react-query'

const fetchCheckApiKey = async (apiKey: string): Promise<boolean> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`
  )

  if (response.status === 200) {
    return true
  }

  if (response.status === 401) {
    throw new Error('Invalid API Key')
  }
  throw new Error('Unexpected Error')
}

const useValidateApiKey = (apiKey: string) => {
  return useQuery({
    queryKey: ['validateApiKey', apiKey],
    queryFn: () => fetchCheckApiKey(apiKey),
    enabled: !!apiKey,
    retry: 0
  })
}

export { useValidateApiKey }
