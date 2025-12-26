// src/renderer/src/pages/process/ui/process.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Badge
} from '@shared/ui'
import { useEffect, useState } from 'react'

// Типы должны совпадать с transport.d.ts
interface ProcessInfo {
  pid: number
  ppid: number
  name: string
  cpu: number
  memory: number
  commandLine: string
  priority: number
  user: string
  startTime: number | null
  state: string
  tty: string | null
  path: string | null
}

interface ProcessesResponse {
  processes: ProcessInfo[]
  stats: {
    total: number
    running: number
    blocked: number
    sleeping: number
    threads: number
    handles: number
  }
}

type ProcessesResult =
  | { success: true; data: ProcessesResponse }
  | { success: false; error: string }

const getStateLabel = (state: string): string => {
  const map: Record<string, string> = {
    R: 'Работает',
    S: 'Сон',
    D: 'Ожидание диска',
    T: 'Приостановлен',
    Z: 'Зомби',
    X: 'Завершён',
    I: 'Бездействие'
  }
  return map[state.toUpperCase()] || 'Неизвестно'
}

const getStateColor = (state: string): string => {
  const map: Record<string, string> = {
    R: 'bg-green-500',
    S: 'bg-yellow-500',
    D: 'bg-blue-500',
    T: 'bg-gray-500',
    Z: 'bg-red-500',
    X: 'bg-red-700',
    I: 'bg-gray-300'
  }
  return map[state.toUpperCase()] || 'bg-gray-400'
}

export const ProcessesPage = () => {
  const [data, setData] = useState<ProcessesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const fetchProcesses = async () => {
    try {
      const result: ProcessesResult = await window.api.getProcesses()

      console.log(result)

      if (result.success) {
        setData(result.data)
        setError(null)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError((err as Error).message)
    }
  }

  useEffect(() => {
    fetchProcesses().finally(() => setLoading(false))

    const interval = setInterval(fetchProcesses, 1000)

    return () => clearInterval(interval)
  }, [])

  const filteredProcesses = data
    ? data.processes
        .filter((p) => p.name !== 'System Idle Process' && p.name !== 'Idle')
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b.cpu - a.cpu)
        .slice(0, 10) 
    : []

  if (loading && !data)
    return <div className="p-6 text-center">Загрузка процессов...</div>

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Мониторинг процессов
        </h2>
        <p className="text-muted-foreground">
          Запущенные процессы и использование системных ресурсов
        </p>
        {error && (
          <p className="mt-2 text-xs text-yellow-600">
            Предупреждение: не удалось обновить данные
          </p>
        )}
      </div>

      {/* Поиск */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:ring-primary w-full max-w-xs rounded-md border bg-transparent px-3 py-1.5 text-sm focus:ring-1 focus:outline-none"
        />
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Всего процессов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data?.stats.total ?? 0}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Активные: {data?.stats.running ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Потоки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {data?.stats.threads > 0
                ? data.stats.threads.toLocaleString()
                : '-'}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">Всего потоков</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Дескрипторы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {data?.stats.handles > 0
                ? data.stats.handles.toLocaleString()
                : '-'}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Системные дескрипторы
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Список процессов */}
      <Card>
        <CardHeader>
          <CardTitle>Основные процессы</CardTitle>
          <CardDescription>
            Отсортировано по загрузке CPU • Найдено: {filteredProcesses.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProcesses.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center text-sm">
              {search ? 'Процессы не найдены' : 'Нет активных процессов'}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredProcesses.map((process) => (
                <div
                  key={process.pid}
                  className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className="max-w-xs truncate text-sm font-medium"
                      title={process.name}
                    >
                      {process.name}
                    </span>
                    <span className="text-muted-foreground font-mono text-xs">
                      PID: {process.pid} • {process.user}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{process.cpu}%</div>
                      <div className="text-muted-foreground text-xs">CPU</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {process.memory} МБ
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Память
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${getStateColor(process.state)}`}
                        title={getStateLabel(process.state)}
                      ></span>
                      <Badge variant="outline" className="text-xs">
                        {getStateLabel(process.state)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
