import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@shared/ui'

export const NetworkPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Мониторинг сети</h2>
        <p className="text-muted-foreground">
          Сетевые интерфейсы и статистика трафика
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Скорость загрузки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">↓ 5,2 МБ/с</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Текущая скорость передачи
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Скорость отдачи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">↑ 1,1 МБ/с</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Текущая скорость передачи
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ethernet-адаптер</CardTitle>
          <CardDescription>Основной сетевой интерфейс</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Состояние</span>
            <span className="text-sm font-medium text-green-500">
              Подключено
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">IP-адрес</span>
            <span className="font-mono text-sm font-medium">192.168.1.100</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">MAC-адрес</span>
            <span className="font-mono text-sm font-medium">
              00:1A:2B:3C:4D:5E
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Скорость</span>
            <span className="text-sm font-medium">1 Гбит/с</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">
              Тип подключения
            </span>
            <span className="text-sm font-medium">Ethernet (проводной)</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Всего скачано</CardTitle>
            <CardDescription>С момента запуска системы</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,5 ГБ</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Время работы: 2 дня 5 часов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Всего отправлено</CardTitle>
            <CardDescription>С момента запуска системы</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,2 ГБ</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Время работы: 2 дня 5 часов
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
