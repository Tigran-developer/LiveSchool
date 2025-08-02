interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  production: false,
  NG_APP_API_HOST: 'http://localhost/api',
  NG_APP_HOST: 'https://localhost:32769/api',
}
