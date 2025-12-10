import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  ModeToggle
} from '@shared/ui'

export const SystemPage = () => {
  return (
    <div className="relative flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Системная информация
        </h2>
        <p className="text-muted-foreground">
          Подробные сведения об операционной системе и аппаратном обеспечении
        </p>
        <ModeToggle />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Операционная система</CardTitle>
          <CardDescription>Версия и конфигурация ОС</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Название</span>
            <span className="text-sm font-medium">Windows 11 Pro</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Версия</span>
            <span className="text-sm font-medium">23H2 (сборка 22631)</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Разрядность</span>
            <span className="text-sm font-medium">64 бита</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">
              Имя устройства
            </span>
            <span className="font-mono text-sm font-medium">DESKTOP-PC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Время работы</span>
            <span className="text-sm font-medium">2 дня 5 часов 32 минуты</span>
          </div>
        </CardContent>
      </Card>

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
            <span className="text-sm font-medium">ASUS</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Модель</span>
            <span className="text-sm font-medium">ROG STRIX B450-F</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Версия BIOS</span>
            <span className="text-sm font-medium">3.40</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">
              Серийный номер
            </span>
            <span className="font-mono text-sm font-medium">ABC123456789</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">UUID</span>
            <span className="font-mono text-sm font-medium">
              550e8400-e29b-41d4
            </span>
          </div>
        </CardContent>
      </Card>

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
            <span className="font-mono text-sm font-medium">v20.11.0</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Движок V8</span>
            <span className="font-mono text-sm font-medium">11.3.244.8</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">npm</span>
            <span className="font-mono text-sm font-medium">10.2.4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Платформа</span>
            <span className="font-mono text-sm font-medium">win32</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
