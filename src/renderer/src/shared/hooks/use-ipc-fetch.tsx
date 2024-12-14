import { useState } from 'react'

export const useIpcFetch = <T, P>(fetchFunction: (params?: P) => Promise<T>) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const ipcFetch = async (params?: P) => {
    setError(null)
    setLoading(true)
    try {
      const response = await fetchFunction(params)
      setData(response)
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, ipcFetch } as const
}

// const {list, setList} = useState([{id:1}, {id:2}, {id:3}])
// const {replaceList, setReplaceList} = useState([])

// const fetchRemove = async (id) => {
//   try {
//     setReplaceList(list)
//     const newList = list.filter((item) => item.id !== id)
//     setList(newList)
//     const response = await fetch(`remove/${id}`)
//   } catch (error) {
//     toast(error) // Всплывающее окошко с ошибкой
//     setList(replaceList)
//   }
// }
