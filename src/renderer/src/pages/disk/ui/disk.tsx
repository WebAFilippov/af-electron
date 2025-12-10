import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Progress
} from '@shared/ui'

export const DiskPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Disk Monitoring</h2>
        <p className="text-muted-foreground">
          Storage devices and file system usage
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>C: Drive (System)</CardTitle>
          <CardDescription>Primary system drive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used</span>
              <span className="font-medium">256 GB / 512 GB</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Type</span>
              <p className="text-sm font-medium">NVMe SSD</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">File System</span>
              <p className="text-sm font-medium">NTFS</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Model</span>
              <p className="text-sm font-medium">Samsung 970 EVO</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Health</span>
              <p className="text-sm font-medium text-green-500">Excellent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>D: Drive (Data)</CardTitle>
          <CardDescription>Secondary storage drive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used</span>
              <span className="font-medium">750 GB / 1 TB</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Type</span>
              <p className="text-sm font-medium">SATA HDD</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">File System</span>
              <p className="text-sm font-medium">NTFS</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Model</span>
              <p className="text-sm font-medium">WD Blue 1TB</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs">Health</span>
              <p className="text-sm font-medium text-green-500">Good</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Read Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850 MB/s</div>
            <p className="text-muted-foreground mt-1 text-xs">
              C: Drive average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Write Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">720 MB/s</div>
            <p className="text-muted-foreground mt-1 text-xs">
              C: Drive average
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
