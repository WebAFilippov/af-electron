// src/main/services/SystemInfoService.ts

import si from 'systeminformation'

interface SystemInfoResponse {
  system: {
    manufacturer: string
    model: string
    serial: string
    uuid: string
  }
  bios: {
    vendor: string
    version: string
    releaseDate: string
  }
  os: {
    platform: string
    distro: string
    release: string
    arch: string
    hostname: string
    build: string
  }
  versions: {
    node: string
    v8: string
    npm: string
    kernel: string
  }
  time: {
    uptime: number
  }
}

interface ProcessesProcessData {
  pid: number
  parentPid: number
  name: string
  cpu: number
  cpuu: number
  cpus: number
  mem: number
  priority: number
  memVsz: number
  memRss: number
  nice: number
  started: string
  state: string
  tty: string
  user: string
  command: string
  params: string
  path: string
}

interface ProcessesData {
  all: number
  running: number
  blocked: number
  sleeping: number
  unknown: number
  list: ProcessesProcessData[]
}

interface ProcessInfo {
  pid: number
  ppid: number
  name: string
  cpu: number
  memory: number
  commandLine: string
  priority: number
  user: string
  startTime: number | null
  state: string
  tty: string | null
  path: string | null
}

export interface ProcessesResponse {
  processes: ProcessInfo[]
  stats: {
    total: number
    running: number
    blocked: number
    sleeping: number
    threads: number // остаётся 0 — нет данных
    handles: number // не поддерживается
  }
}



export class SystemInfoService {
  static async getSystemInfo(): Promise<SystemInfoResponse> {
    try {
      const [
        system,
        bios,
        osInfo,
        versions,
        time,
      ] = await Promise.all([
        si.system(),
        si.bios(),
        si.osInfo(),
        si.versions(),
        si.time(),
      ])

      return {
        system: {
          manufacturer: system.manufacturer || 'Unknown',
          model: system.model || 'Unknown',
          serial: system.serial || 'Unknown',
          uuid: system.uuid || 'Unknown',
        },
        bios: {
          vendor: bios.vendor || 'Unknown',
          version: bios.version || 'Unknown',
          releaseDate: bios.releaseDate || 'Unknown',
        },
        os: {
          platform: osInfo.platform || 'Unknown',
          distro: osInfo.distro || 'Unknown',
          release: osInfo.release || 'Unknown',
          arch: osInfo.arch || 'Unknown',
          hostname: osInfo.hostname || 'Unknown',
          build: osInfo.build || 'Unknown',
        },
        versions: {
          node: process.version, // берём из самого Node, актуально
          v8: versions.v8 || 'Unknown',
          npm: versions.npm || 'Unknown',
          kernel: versions.kernel || 'Unknown',
        },
        time: {
          uptime: time.uptime || 0,
        },
      }
    } catch (error) {
      console.error('Failed to collect system info:', error)
      throw error
    }
  }

  static async getProcesses(): Promise<ProcessesResponse> {
    try {
      const data: ProcessesData = await si.processes()
      
      si.services('*').then(data => console.log(data));

      const processes: ProcessInfo[] = data.list.map(p => ({
        pid: p.pid,
        ppid: p.parentPid,
        name: p.name || 'Unknown',
        cpu: Number(p.cpu.toFixed(2)),
        memory: Number(p.mem.toFixed(0)), // mem — уже в MB
        commandLine: [p.command, p.params].filter(Boolean).join(' ').trim() || '-',
        priority: p.priority,
        user: p.user || 'system',
        startTime: p.started ? this.parseDateTime(p.started) : null,
        state: p.state,
        tty: p.tty || null,
        path: p.path || null,
      }))

      // threads и handles — не доступны
      // Если нужно — можно добавить эвристику для threads (например, avg с другого API), но пока 0
      return {
        processes,
        stats: {
          total: data.all,
          running: data.running,
          blocked: data.blocked,
          sleeping: data.sleeping,
          threads: 0, // не доступно
          handles: 0, // не доступно
        },
      }
    } catch (error) {
      console.error('Failed to get processes:', error)
      throw error
    }
  }

  // Вспомогательный метод: парсинг строки started (например, "2025-04-05T12:34:56")
  private static parseDateTime(dateStr: string): number | null {
    const ts = Date.parse(dateStr)
    return isNaN(ts) ? null : ts
  }

}
