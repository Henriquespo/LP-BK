/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * ID de medição do GA4, no formato `G-XXXXXXXXXX`.
   * Ausente ou vazio: o analytics não carrega e os eventos viram no-op.
   */
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
