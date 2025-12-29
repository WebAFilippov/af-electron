import { Card, CardContent, CardHeader } from '@shared/ui'
import React, { useEffect, useState } from 'react'

import { MyLineChart } from './chart_comp'

export interface DataPoint {
  time: number
  pos: number
  adc: number
  error: boolean
  errorMessage?: string
}

export const UdpDashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([
    { time: new Date().getTime(), pos: 0, adc: 0, error: false }
  ])
  const [currentInfo, setCurrentInfo] = useState({
    pos: 0,
    adc: 0,
    ip: 'Не найдено'
  })
  const [maxAmper, setMaxAmper] = useState(0)
  const [absAmper, setAbsAmper] = useState<number | string>(0)

  useEffect(() => {
    // Подписываемся на данные из API (через preload)
    window.api.onUdpData((payload) => {
      setCurrentInfo(payload)
      setMaxAmper((prev) => {
        return prev < Math.max(payload.adc) ? Math.max(payload.adc) : prev
      })

      setData((prevData) => {
        const newData = [
          ...prevData,
          {
            time: new Date().getTime(),
            pos: payload.pos,
            adc: payload.adc,
            error: payload.adc > 0 && Math.random() > 0.5 ? true : false,
            errorMessage: `dsa ${Math.random().toFixed(2)}`
          }
        ]

        const average =
          newData.length > 0
            ? newData.reduce((sum, item) => sum + item.adc, 0) / newData.length
            : 0

        setAbsAmper(average.toFixed(0))

        return newData.slice(-50)
      })
    })
  }, [])

  return (
    <div className="h-full w-full overflow-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Debug UDP</h2>
        <Card className="p-2">
          <CardContent className="px-2">
            <div className="text-sm tracking-tight">
              Источник:
              <span className="text-chart-2 ml-2 font-mono">
                {currentInfo.ip ?? 'Не найдено'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="gap-0">
          <CardHeader>
            <p className="text-sm font-medium tracking-wider">
              Current: ADC load
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-chart-5 font-mono text-2xl">{currentInfo.adc}</p>
          </CardContent>
        </Card>
        <Card className="gap-0">
          <CardHeader>
            <p className="text-sm tracking-wider">ABS: ADC load</p>
          </CardHeader>
          <CardContent>
            <p className="text-chart-5 font-mono text-2xl">{absAmper}</p>
          </CardContent>
        </Card>
        <Card className="gap-0">
          <CardHeader>
            <p className="text-sm tracking-wider">Max: ADC load</p>
          </CardHeader>
          <CardContent>
            <p className="text-chart-5 font-mono text-2xl">{maxAmper}</p>
          </CardContent>
        </Card>
      </div>

      <MyLineChart data={data} />
    </div>
  )
}
