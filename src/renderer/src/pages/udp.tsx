import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface DataPoint {
  time: string
  pos: number
  adc: number
}

export const UdpDashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([])
  const [currentInfo, setCurrentInfo] = useState({ pos: 0, adc: 0, ip: '-' })

  useEffect(() => {
    // Подписываемся на данные из API (через preload)
    window.api.onUdpData((payload) => {
      setCurrentInfo(payload)

      setData((prevData) => {
        const newData = [
          ...prevData,
          {
            time: new Date().toLocaleTimeString(),
            pos: payload.pos,
            adc: payload.adc
          }
        ]
        // Храним только последние 50 точек для плавности
        return newData.slice(-50)
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-400">
          ESP32 Live Telemetry
        </h1>
        <div className="rounded border border-gray-700 bg-gray-800 p-2 text-sm">
          Source:{' '}
          <span className="font-mono text-green-400">{currentInfo.ip}</span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Encoder Position</p>
          <p className="font-mono text-3xl text-blue-500">{currentInfo.pos}</p>
        </div>
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm text-gray-400">ADC Current</p>
          <p className="font-mono text-3xl text-orange-500">
            {currentInfo.adc}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="h-[300px] rounded-xl bg-gray-800 p-4">
          <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
            Position Curve
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" hide />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              />
              <Line
                type="monotone"
                dataKey="pos"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px] rounded-xl bg-gray-800 p-4">
          <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
            ADC (Load) Curve
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" hide />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
              />
              <Line
                type="monotone"
                dataKey="adc"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
