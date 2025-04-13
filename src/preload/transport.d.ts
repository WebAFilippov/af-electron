interface WindowState {
  minimize: boolean;
  maximize: boolean;
  fullscreen: boolean;
  show: boolean;
}

type Theme = "light" | "dark";

type UpdatedStatusDto =
  | 'checking-for-update'
  | 'download-progress'
  | 'update-available'
  | 'update-downloaded'
  | 'update-not-available'
  | 'error'

export type { Theme, WindowState, UpdatedStatusDto };
