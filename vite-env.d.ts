// <reference types = 'vite/client'

interface ImportMetaEnv {
	readonly VITE_BACKEND_URL: string;
  readonly VITE_BACKEND_GETUSER: string;
  readonly VITE_BACKEND_LOGOUT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
