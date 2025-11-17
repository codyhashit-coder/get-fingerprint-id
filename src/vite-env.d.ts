/// <reference types="vite/client" />

interface ImportMeta {
  glob: (pattern: string) => Record<string, any>;
}

declare module '*.json' {
  const value: any;
  export default value;
}
