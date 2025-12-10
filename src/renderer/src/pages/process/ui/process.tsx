import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Badge
} from '@shared/ui'

const processes = [
  { name: 'Chrome', pid: 1234, cpu: 12.5, memory: 850, status: 'Работает' },
  { name: 'VSCode', pid: 5678, cpu: 8.2, memory: 650, status: 'Работает' },
  { name: 'Node.js', pid: 9012, cpu: 5.1, memory: 320, status: 'Работает' },
  { name: 'Discord', pid: 3456, cpu: 3.8, memory: 280, status: 'Работает' },
  { name: 'Spotify', pid: 7890, cpu: 2.1, memory: 195, status: 'Работает' },
  { name: 'Explorer', pid: 1122, cpu: 1.5, memory: 125, status: 'Работает' },
  { name: 'System', pid: 4, cpu: 0.8, memory: 45, status: 'Работает' },
  { name: 'svchost', pid: 2233, cpu: 0.3, memory: 32, status: 'Работает' }
]

export const ProcessesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Мониторинг процессов
        </h2>
        <p className="text-muted-foreground">
          Запущенные процессы и использование системных ресурсов
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Всего процессов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">152</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Активные процессы
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Потоки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2 348</div>
            <p className="text-muted-foreground mt-1 text-xs">Всего потоков</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Дескрипторы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78 521</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Системные дескрипторы
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Основные процессы</CardTitle>
          <CardDescription>Отсортировано по загрузке CPU</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {processes.map((process) => (
              <div
                key={process.pid}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{process.name}</span>
                  <span className="text-muted-foreground font-mono text-xs">
                    PID: {process.pid}
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
                    <div className="text-muted-foreground text-xs">Память</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {process.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
