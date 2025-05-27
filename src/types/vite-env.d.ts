/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string;
    // add more env vars here as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  