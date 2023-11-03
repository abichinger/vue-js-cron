/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLAVOR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
