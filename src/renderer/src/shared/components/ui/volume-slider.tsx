import { Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'

import { Label } from './label'
import { Slider } from './slider'

const VolumeSLider = ({ volume }: { volume: number }) => {
  const [value, setValue] = useState([volume])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <Label className="leading-6">Volume</Label>
        <output className="text-sm font-medium tabular-nums">{value[0]}</output>
      </div>
      <div className="flex items-center gap-2">
        <VolumeX className="shrink-0 opacity-60" size={20} strokeWidth={2} aria-hidden="true" />
        <Slider value={value} onValueChange={setValue} aria-label="Volume slider" />
        <Volume2 className="shrink-0 opacity-60" size={20} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  )
}

export { VolumeSLider }
