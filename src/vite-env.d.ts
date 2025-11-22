/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAKE_BOOKING_WEBHOOK_URL: string;
  readonly VITE_MAKE_CONTACT_WEBHOOK_URL: string;
  readonly VITE_MAKE_TESTIMONIAL_WEBHOOK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
