import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@shared/ui'
import {
  CpuIcon,
  HardDriveIcon,
  MemoryStickIcon,
  NetworkIcon
} from 'lucide-react'

export const OverviewPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Обзор системы</h2>
        <p className="text-muted-foreground">
          Мониторинг ресурсов компьютера в реальном времени
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Загрузка CPU</CardTitle>
            <CpuIcon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <p className="text-muted-foreground text-xs">
              Intel Core i7-9700K @ 3.60 ГГц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Память</CardTitle>
            <MemoryStickIcon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,2 ГБ</div>
            <p className="text-muted-foreground text-xs">
              из 16 ГБ занято (51%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Диск</CardTitle>
            <HardDriveIcon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256 ГБ</div>
            <p className="text-muted-foreground text-xs">
              из 512 ГБ занято (50%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Сеть</CardTitle>
            <NetworkIcon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">↓ 5,2 МБ/с</div>
            <p className="text-muted-foreground text-xs">
              ↑ 1,1 МБ/с исходящий
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о системе</CardTitle>
          <CardDescription>
            Аппаратные характеристики и данные ОС
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">
              Операционная система
            </span>
            <span className="text-sm font-medium">Windows 11 Pro</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">
              Имя устройства
            </span>
            <span className="font-mono text-sm font-medium">DESKTOP-PC</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Время работы</span>
            <span className="text-sm font-medium">2 дня 5 часов</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">
              Версия Node.js
            </span>
            <span className="font-mono text-sm font-medium">v20.11.0</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
