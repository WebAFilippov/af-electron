import {
  LineChart,
  CartesianGrid,
  YAxis,
  Line,
  ReferenceDot,
  ReferenceLine,
  XAxis
} from 'recharts'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@shared/ui'

import { memo, useMemo } from 'react'
import { DataPoint } from './udp'
import { ChartConfig, CustomTooltipProps } from '@shared/ui/chart'
import { ErrorAwareTooltip } from './errortooltip'

interface Props {
  data: DataPoint[]
}

const chartConfig = {
  adc: {
    label: 'ADC Value',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

export const MyLineChart = memo(function MyLineChart({ data }: Props) {
  const memoData = useMemo(() => data, [data])
  const errorPoints = useMemo(() => memoData.filter((p) => p.error), [memoData])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Realtime ADC</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart data={memoData} accessibilityLayer>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
            />

            <XAxis
              dataKey="time"
              type="number"
              domain={['auto', 'auto']}
              tickCount={6}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })
              }
            />

            <YAxis
              yAxisId="adc"
              orientation="left"
              domain={["auto", "auto"]}
              width={35}
              tickMargin={10}
            />

            <ChartTooltip
              cursor={true}
              content={(props: CustomTooltipProps) => (
                <>
                  <ErrorAwareTooltip {...props} errorPoints={errorPoints} />
                </>
              )}
            />

            <Line
              yAxisId="adc"
              dataKey="adc"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              type="monotone"
            />

            {errorPoints.map((p) => (
              <ReferenceDot
                x={p.time}
                y={p.adc}
                yAxisId="adc"
                r={3}
                fill="red"
                stroke="white"
                strokeWidth={0}
                ifOverflow="extendDomain"
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
})
