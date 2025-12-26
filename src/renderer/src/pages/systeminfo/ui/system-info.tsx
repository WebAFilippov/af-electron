// src/renderer/src/pages/systeminfo/ui/system-info.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  ModeToggle
} from '@shared/ui'
import { useEffect, useState } from 'react'

interface SystemInfoResponse {
  success: boolean
  data?: {
    system: {
      manufacturer: string
      model: string
      serial: string
      uuid: string
    }
    bios: { vendor: string; version: string; releaseDate: string }
    os: {
      platform: string
      distro: string
      release: string
      arch: string
      hostname: string
      build: string
    }
    versions: { node: string; v8: string; npm: string; kernel: string }
    time: { uptime: number }
  }
  error?: string
}

export const SystemPage = () => {
  const [systemInfo, setSystemInfo] = useState<
    SystemInfoResponse['data'] | null
  >(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSystemInfo = async () => {
    try {
      const result = await window.api.getSystemInfo()

      if (result.success) {
        setSystemInfo(result.data)
        setError(null) // сбрасываем ошибку при успехе
      } else {
        setError(result.error || 'Unknown error')
      }
    } catch (err) {
      setError((err as Error).message)
    }
  }

  useEffect(() => {
    // Первичная загрузка
    fetchSystemInfo().finally(() => setLoading(false))

    // Автообновление каждые 10 секунд
    const interval = setInterval(() => {
      fetchSystemInfo()
    }, 10_000) // 10 секунд

    // Очистка при размонтировании
    return () => clearInterval(interval)
  }, [])

  const cleanDistroName = (distro: string): string => {
    if (distro.includes('��������')) return 'Windows 10 Pro'
    return distro.trim() || 'Unknown OS'
  }

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days} дней ${hours} часов ${minutes} минут`
  }

  if (loading && !systemInfo)
    return (
      <div className="p-6 text-center">Загрузка системной информации...</div>
    )

  // Показываем последнюю успешную информацию, даже если текущий запрос упал
  if (!systemInfo)
    return <div className="p-6 text-red-500">Не удалось загрузить данные</div>

  const { system, bios, os, versions, time } = systemInfo

  return (
    <div className="relative flex flex-col gap-6 p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Системная информация
        </h2>
        <p className="text-muted-foreground">
          Подробные сведения об операционной системе и аппаратном обеспечении
        </p>
        <ModeToggle />
        {error && (
          <p className="mt-2 text-xs text-yellow-600">
            Предупреждение: не удалось обновить данные
          </p>
        )}
      </div>

      {/* Операционная система */}
      <Card>
        <CardHeader>
          <CardTitle>Операционная система</CardTitle>
          <CardDescription>Версия и конфигурация ОС</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Название</span>
            <span className="text-sm font-medium">
              {cleanDistroName(os.distro)}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Версия</span>
            <span className="text-sm font-medium">
              {os.release} (сборка {os.build})
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Разрядность</span>
            <span className="text-sm font-medium">
              {os.arch === 'x64' ? '64 бита' : '32 бита'}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">
              Имя устройства
            </span>
            <span className="font-mono text-sm font-medium">{os.hostname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Время работы</span>
            <span className="text-sm font-medium">
              {formatUptime(time.uptime)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Аппаратное обеспечение */}
      <Card>
        <CardHeader>
          <CardTitle>Аппаратное обеспечение</CardTitle>
          <CardDescription>
            Характеристики системного оборудования
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Производитель</span>
            <span className="text-sm font-medium">{system.manufacturer}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Модель</span>
            <span className="text-sm font-medium">{system.model}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Версия BIOS</span>
            <span className="text-sm font-medium">{bios.version}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">
              Дата выхода BIOS
            </span>
            <span className="text-sm font-medium">{bios.releaseDate}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">
              Серийный номер
            </span>
            <span className="font-mono text-sm font-medium">
              {system.serial === 'To be filled by O.E.M.'
                ? 'Не указан'
                : system.serial}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">UUID</span>
            <span className="font-mono text-sm font-medium">
              {system.uuid === 'ffffffff-ffff-ffff-ffff-ffffffffffff'
                ? 'Не определён'
                : system.uuid}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Среда выполнения */}
      <Card>
        <CardHeader>
          <CardTitle>Среда выполнения</CardTitle>
          <CardDescription>
            Версии сред выполнения и инструментов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Node.js</span>
            <span className="font-mono text-sm font-medium">
              v{versions.node}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Движок V8</span>
            <span className="font-mono text-sm font-medium">{versions.v8}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">npm</span>
            <span className="font-mono text-sm font-medium">
              {versions.npm}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Ядро ОС</span>
            <span className="font-mono text-sm font-medium">
              {versions.kernel}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
