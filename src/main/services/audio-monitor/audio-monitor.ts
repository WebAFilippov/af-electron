import { ChildProcess, spawn } from 'child_process'
import { app } from 'electron'
import path from 'path'
import { CustomEventEmitter } from './event-emitter'
import { AudioMonitorOptions, IChange, IDevice, AudioMonitorEvents } from './types'

export class AudioDeviceMonitor {
  private audioDeviceProcess: ChildProcess | null = null
  private exePath: string = ''
  private deviceInfo: IDevice = { id: '', name: '', volume: 0, muted: false }
  private deviceChange: IChange = { id: false, name: false, volume: false, muted: false }
  private eventEmitter = new CustomEventEmitter()
  private autoStart: boolean
  private logger: boolean
  private delay: number
  private step: number

  constructor(options?: AudioMonitorOptions) {
    this.autoStart = options?.autoStart ?? true
    this.logger = options?.logger ?? true
    this.delay = options?.delay !== undefined ? Math.max(options.delay, 100) : 250
    this.step = options?.step || 5

    if (this.autoStart) {
      this.start()
    }
  }

  public on<K extends keyof AudioMonitorEvents>(event: K, listener: AudioMonitorEvents[K]): void {
    this.eventEmitter.on(event, listener)
  }

  public start(): void {
    if (this.audioDeviceProcess) {
      this.printMessage('error', 'Процесс уже запущен.')
      return
    }

    this.exePath = path
      .join(app.getAppPath(), 'resources', 'af-win-audio.exe')
      .replace('app.asar', 'app.asar.unpacked')

    this.audioDeviceProcess = spawn(this.exePath, [this.delay.toString(), this.step.toString()], { windowsHide: true })

    this.audioDeviceProcess.on('error', (err) => this.printMessage('error', `Не удалось запустить процесс: ${err.message}`))

    if (this.audioDeviceProcess?.stdout) {
      this.audioDeviceProcess.stdout.on('data', (data: Buffer) => {
        try {
          const deviceInfo = JSON.parse(data.toString())
          this.checkChange(deviceInfo)
          this.deviceInfo = deviceInfo
          this.eventEmitter.emit('change', this.deviceInfo, this.deviceChange)
          this.resetDeviceChange()
        } catch (e) {
          this.printMessage('error', `Не удалось обработать данные: ${e}`)
        }
      })
    }

    this.audioDeviceProcess.stderr?.on('data', (data: Buffer) =>
      this.printMessage('error', `C# Ошибка: ${data.toString('utf-8')}`)
    )

    this.audioDeviceProcess.on('close', (code) => {
      const exitMessage = code === 0 || code === null
        ? 'Процесс успешно завершился.'
        : `Ошибка код: ${code}`
      this.printMessage('exit', exitMessage)
    })
  }

  // Другие методы: upVolume, downVolume, mute, unmute...
  
  private printMessage(event: keyof AudioMonitorEvents, message: string) {
    this.eventEmitter.emit(event, message)
  }

  private checkChange(newDeviceInfo: IDevice) {
    this.deviceChange.id = this.deviceInfo.id !== newDeviceInfo.id
    this.deviceChange.name = this.deviceInfo.name !== newDeviceInfo.name
    this.deviceChange.volume = this.deviceInfo.volume !== newDeviceInfo.volume
    this.deviceChange.muted = this.deviceInfo.muted !== newDeviceInfo.muted
  }

  private resetDeviceChange() {
    this.deviceChange = { id: false, name: false, volume: false, muted: false }
  }
}
