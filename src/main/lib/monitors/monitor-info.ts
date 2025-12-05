import { exec } from "child_process";

export interface MonitorInfoBasic {
  FriendlyName: string;
  Manufacturer: string;
  ProductCode?: string;
  SerialNumber?: string;
  PNPDeviceID: string;
  YearOfManufacture?: number;
  WeekOfManufacture?: number;
}

/**
 * Возвращает массив объектов с базовой информацией о мониторах
 */
export function getMonitorsInfoDecoded(): Promise<MonitorInfoBasic[]> {
  return new Promise((resolve, reject) => {
    const psCommand = `
      $monitors = Get-CimInstance -ClassName Win32_DesktopMonitor | Where-Object { $_.PNPDeviceID -ne $null }

      $results = @()
      foreach ($mon in $monitors) {
        $pnp = $mon.PNPDeviceID
        $name = if ($mon.Name) { $mon.Name } else { "" }

        # Попытка вытащить Manufacturer/Product/Serial из PNPDeviceID
        $manufacturer = ""
        $productCode = ""
        $serial = ""
        if ($pnp -match "DISPLAY\\\\([A-Z0-9]+)([0-9]+)\\\\(.+)") {
          $manufacturer = $matches[1]
          $productCode = $matches[2]
          $serial = $matches[3]
        }

        $results += [PSCustomObject]@{
          FriendlyName      = $name
          Manufacturer      = $manufacturer
          ProductCode       = $productCode
          SerialNumber      = $serial
          PNPDeviceID       = $pnp
          YearOfManufacture = $null
          WeekOfManufacture = $null
        }
      }

      if ($results) { $results | ConvertTo-Json -Depth 4 } else { "[]" }
    `;

    exec(
      `powershell -NoProfile -ExecutionPolicy Bypass -Command "${psCommand}"`,
      { maxBuffer: 1024 * 1024 },
      (error, stdout) => {
        if (error) return reject(error);

        const clean = stdout.trim();
        if (!clean) return resolve([]);

        try {
          const data: any[] = JSON.parse(clean);
          resolve(Array.isArray(data) ? data : [data]);
        } catch (err) {
          console.log("RAW OUTPUT:", stdout);
          reject(err);
        }
      }
    );
  });
}
