import { Progress } from '@radix-ui/react-progress'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@shared/ui'

export const MemoryPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Мониторинг памяти</h2>
        <p className="text-muted-foreground">
          Использование оперативной памяти и распределение ресурсов
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего памяти</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">16 ГБ</div>
            <p className="text-muted-foreground mt-1 text-xs">DDR4, 3200 МГц</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Используется</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,2 ГБ</div>
            <p className="text-muted-foreground mt-1 text-xs">51,3% загрузка</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Использование ОЗУ</CardTitle>
          <CardDescription>Текущее распределение памяти</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Используется</span>
              <span className="font-medium">8,2 ГБ / 16 ГБ</span>
            </div>
            <Progress value={51} className="h-2 w-full" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Свободно</span>
              <span className="font-medium">7,8 ГБ</span>
            </div>
            <Progress value={49} className="h-2 w-full" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Кэшировано</span>
              <span className="font-medium">3,2 ГБ</span>
            </div>
            <Progress value={20} className="h-2 w-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Файл подкачки</CardTitle>
          <CardDescription>Использование виртуальной памяти</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Объём</span>
            <span className="text-sm font-medium">8 ГБ</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Используется</span>
            <span className="text-sm font-medium">512 МБ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Свободно</span>
            <span className="text-sm font-medium">7,5 ГБ</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
