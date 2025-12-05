import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui'

export const ManageAmbilight = () => {
  return (
    <div className="w-full lg:col-span-3 flex flex-col gap-4 h-full">
      <Tabs defaultValue="info">
        <TabsList className="w-full select-none">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="device">Device</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
        </TabsList>
        <TabsContent value="info">info</TabsContent>
        <TabsContent value="device">device</TabsContent>
        <TabsContent value="segments">segments</TabsContent>
      </Tabs>
    </div>
  )
}
