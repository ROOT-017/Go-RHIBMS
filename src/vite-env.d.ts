/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIRE_BASE_API_KEY: string;
  readonly VITE_FIRE_BASE_AUTH_DOMAIN: string;
  readonly VITE_FIRE_BASE_PROJECT_ID: string;
  readonly VITE_FIRE_BASE_STORAGE_BUCKET: string;
  readonly VITE_FIRE_BASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIRE_BASE_APP_ID: string;
  readonly VITE_FIRE_BASE_MEASUREMENT_ID: string;

  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
  readonly VITE_GOOGLE_CLIENT_LIB_URL: string;
  readonly VITE_GOOGLE_DRIVE_API_KEY: string;
  readonly VITE_GOOGLE_DISCOVERY_DOC: string;
  readonly VITE_GOOGLE_DRIVE_SCOPES: string;
  readonly VITE_GOOGLE_APIS_URL: string;
  readonly VITE_GOOGLE_PLACES_URL: string;
  readonly VITE_GOOGLE_PLACES_KEY: string;

  readonly VITE_CV_ML_BASE_URL: string;
  readonly VITE_LOGOUT_INACTIVITY_DURATION: number;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  // more variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
