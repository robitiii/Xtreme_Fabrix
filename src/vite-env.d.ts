/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_APPS_SCRIPT_BOOKING_URL?: string;
  readonly VITE_GOOGLE_REVIEWS_CSV_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
