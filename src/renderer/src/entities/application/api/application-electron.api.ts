// import { useMutation, useQuery } from '@tanstack/react-query'

// const useMinimizeWindow = () => {
//   return useMutation<void, Error, void>({
//     mutationFn: (): Promise<void> => {
//       window.api.setMinimazeWindow()
//       return Promise.resolve()
//     }
//   })
// }

// const useMaximizeWindow = () => {
//   return useMutation<void, Error, void>({
//     mutationFn: (): Promise<void> => {
//       window.api.setMaximazeWindow()
//       return Promise.resolve()
//     }
//   })
// }

// const useCloseWindow = () => {
//   return useMutation<void, Error, void>({
//     mutationFn: (): Promise<void> => {
//       window.api.setCloseWindow()
//       return Promise.resolve()
//     }
//   })
// }

// const useNetworkConnection = (delay: number) => {
//   return useQuery({
//     queryKey: ['checkConnection'],
//     queryFn: async () => {
//       // return await window.api.checkConnection()
//     },
//     staleTime: 0,
//     refetchInterval: delay
//   })
// }

// const useStartApplication = () => {
//   return useQuery({
//     queryKey: ['startApp'],
//     queryFn: async () => {
//       return window.api.start()
//     },
//     refetchOnWindowFocus: false,
//     retry: 0
//   })
// }

// export {
//   useCloseWindow,
//   useMaximizeWindow,
//   useMinimizeWindow,
//   useNetworkConnection,
//   useStartApplication
// }
