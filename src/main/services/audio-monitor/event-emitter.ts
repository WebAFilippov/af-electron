import { AudioMonitorEvents } from './types'

export class CustomEventEmitter {
  private listeners: {
    [K in keyof AudioMonitorEvents]?: AudioMonitorEvents[K][]
  } = {}

  public on<K extends keyof AudioMonitorEvents>(event: K, listener: AudioMonitorEvents[K]): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(listener)
  }

  public emit<K extends keyof AudioMonitorEvents>(
    event: K,
    ...args: Parameters<AudioMonitorEvents[K]>
  ): void {
    const listeners = this.listeners[event] || []
    listeners.forEach((listener) => listener(...args))
  }
}
