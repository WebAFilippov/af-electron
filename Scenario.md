сделать стейт и управление окном

стейт + надлерсы для обновления стейта

// Люновить процессесли закрылся
```import path from 'path';
import { spawn, ChildProcess } from 'child_process';
import ps from 'ps-node'; // npm install ps-node

class AudioDeviceManager {
  private exePath: string;
  private audioDeviceProcess: ChildProcess | null = null;
  private delay: number = 1000; // Ваше значение задержки
  private step: number = 5; // Ваш шаг изменения громкости

  constructor() {
    this.exePath = path
      .join(app.getAppPath(), 'resources', 'af-win-audio.exe')
      .replace('app.asar', 'app.asar.unpacked');
  }

  // Проверка и запуск процесса
  public ensureProcessRunning() {
    const processName = 'af-win-audio.exe';

    ps.lookup({ command: processName }, (err, resultList) => {
      if (err) {
        console.error('Ошибка при проверке процесса:', err);
        return;
      }

      if (resultList.length === 0) {
        console.log('Процесс не запущен. Запускаем...');
        this.startProcess();
      } else {
        console.log('Процесс уже запущен:', resultList);
      }
    });
  }

  // Запуск процесса
  private startProcess() {
    this.audioDeviceProcess = spawn(this.exePath, [this.delay.toString(), this.step.toString()]);

    this.audioDeviceProcess.on('error', (err) => {
      console.error('Ошибка при запуске процесса:', err);
    });

    this.audioDeviceProcess.on('close', (code) => {
      console.log(`Процесс завершился с кодом ${code}`);
    });

    console.log('Процесс успешно запущен');
  }
}

export default AudioDeviceManager;

// Использование
const manager = new AudioDeviceManager();
manager.ensureProcessRunning();
```



// Если window.show слушать иначе удалить слушатель в файле app-layout.tsx
