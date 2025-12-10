import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@shared/ui'

export const CPUPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Мониторинг CPU</h2>
        <p className="text-muted-foreground">
          Подробная статистика по загрузке и температуре процессора
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Текущая загрузка
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45,3%</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Среднее значение по всем ядрам
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Температура</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">62 °C</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Средняя по ядрам
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Тактовая частота
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3,8 ГГц</div>
            <p className="text-muted-foreground mt-1 text-xs">
              Базовая: 3,6 ГГц
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Характеристики процессора</CardTitle>
          <CardDescription>Аппаратные параметры CPU</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Модель</span>
            <span className="text-sm font-medium">Intel Core i7-9700K</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Ядра</span>
            <span className="text-sm font-medium">8</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Потоки</span>
            <span className="text-sm font-medium">8</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground text-sm">Архитектура</span>
            <span className="text-sm font-medium">x64</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Кэш</span>
            <span className="text-sm font-medium">12 МБ L3</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
