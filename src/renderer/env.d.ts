/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_MORPHER_APIKEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
