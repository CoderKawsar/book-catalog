/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_apiKey: string;
  VITE_APP_authDomain: string;
  VITE_APP_projectId: string;
  VITE_APP_storageBucket: string;
  VITE_APP_messagingSenderId: string;
  VITE_APP_appId: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
