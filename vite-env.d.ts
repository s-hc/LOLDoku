/// <reference types = 'vite/client'/>

interface ImportMetaEnv {
	readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
	NODE_ENV: string;
	readonly env: ImportMetaEnv;
}

