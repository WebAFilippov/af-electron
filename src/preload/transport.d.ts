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
  | 'update-cancelled'
  | 'update-downloaded'
  | 'update-not-available'

export type { Theme, WindowState, UpdatedStatusDto };
