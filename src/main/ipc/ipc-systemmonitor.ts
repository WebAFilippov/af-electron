import { SystemInfoService } from "@lib/system_monitor"
import { ipcMain } from "electron"


export const ipcSystemMonitor = () => {
    ipcMain.handle('get-system-info', async () => {
        try {
            const data = await SystemInfoService.getSystemInfo()
            return { success: true, data }
        } catch (error) {
            console.error('IPC get-system-info failed:', error)
            return { success: false, error: (error as Error).message }
        }
    })

    ipcMain.handle('get-processes', async () => {
        try {
            const data = await SystemInfoService.getProcesses()
            return { success: true, data }
        } catch (error) {
            console.error('IPC get-processes failed:', error)
            return { success: false, error: (error as Error).message }
        }
    })
}
