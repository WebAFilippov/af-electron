import { useMutation, useQuery } from '@tanstack/react-query'


const useMinimizeWindow = () => {
  return useMutation<void, Error, void>({
    mutationFn: (): Promise<void> => {
      window.api.setMinimazeWindow()
      return Promise.resolve()
    }
  })
}

const useMaximizeWindow = () => {
  return useMutation<void, Error, void>({
    mutationFn: (): Promise<void> => {
      window.api.setMaximazeWindow()
      return Promise.resolve()
    }
  })
}

const useCloseWindow = () => {
  return useMutation<void, Error, void>({
    mutationFn: (): Promise<void> => {
      window.api.setCloseWindow()
      return Promise.resolve()
    }
  })
}

const useNetworkConnection = (delay: number) => {
  return useQuery({
    queryKey: ['checkConnection'],
    queryFn: async () => {
      return await window.api.checkConnection()
    },
    staleTime: 0,
    refetchInterval: delay
  })
}

const useStartApp = () => {
  return useQuery({
    queryKey: ['startApp'],
    queryFn: async () => {
      console.log('useQuery StartApp')
      return window.api.startApp()
    },
    refetchOnWindowFocus: false,
    retry: 0
  })
}

export { useMinimizeWindow, useMaximizeWindow, useCloseWindow, useNetworkConnection, useStartApp }
