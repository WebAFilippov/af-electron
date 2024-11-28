export const checkNetworkConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://www.yandex.ru/favicon.ico', {
      cache: 'no-store'
    })
    return response.ok
  } catch {
    return false
  }
}
