import { InteractiveMonitor } from '@features/interactive-monitor'
import { ManageAmbilight } from '@widgets/manage-ambilight'

export const AmbilightPage = () => {
  return (
    <div className="grid lg:grid-cols-10 grid-cols-1 gap-6 overflow-hidden p-4">
      <InteractiveMonitor />
      <ManageAmbilight />
    </div>
  )
}
