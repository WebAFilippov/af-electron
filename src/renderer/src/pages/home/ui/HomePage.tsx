import { PageLayout } from '@shared/ui'
import { NavigationPanel } from '@widgets/navigation-panel'

export const HomePage = () => {
  return <PageLayout leftSlot={<NavigationPanel />}>homepage</PageLayout>
}
