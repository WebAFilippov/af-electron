import { InteractiveMonitor } from '@features/interactive-monitor'

import { ManageAmbilight } from '@widgets/manage-ambilight'

export const AmbilightPage = () => {
  return (
    <div className="grid grid-cols-1 gap-6 overflow-hidden p-4 lg:grid-cols-10">
      <InteractiveMonitor />
      <ManageAmbilight />
    </div>
  )
}
