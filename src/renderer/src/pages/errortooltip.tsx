import { CustomTooltipProps } from '@shared/ui/chart'
import { DataPoint } from './udp'

const ERROR_TIME_WINDOW = 20
export function ErrorAwareTooltip({
  active,
  label,
  payload,
  errorPoints
}: CustomTooltipProps & {
  errorPoints: DataPoint[]
}) {
  if (!active || !label) return null

  const error = errorPoints.find(
    (p) => Math.abs(p.time - label) < ERROR_TIME_WINDOW
  )

  return (
    <div className="bg-background rounded-md border p-2 text-xs shadow">
      <div>ADC: {payload?.[0]?.value}</div>
      <div className="text-muted-foreground">
        {new Date(label).toLocaleTimeString()}
      </div>

      {error && (
        <div className="mt-1 font-medium text-red-600">
          ⚠ {error.errorMessage ?? 'Ошибка'}
        </div>
      )}
    </div>
  )
}
