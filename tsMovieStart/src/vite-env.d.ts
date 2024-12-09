interface ImportMetaEnv {
  readonly VITE_APP_API_KEY: string; // VITE 환경 변수 타입 정의
  readonly VITE_MOVIE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv; // import.meta.env의 타입 정의
}
