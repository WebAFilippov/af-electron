interface WindowState {
  minimize: boolean;
  maximize: boolean;
  fullscreen: boolean;
  show: boolean;
}

type Theme = "light" | "dark";

export type { Theme, WindowState };
