import packageInfo from '../../package.json';

export const environment = {
  production: false,
  NG_APP_API_HOST: 'https://localhost:7239/api',
  NG_APP_HOST: 'https://localhost:7239',
  version: packageInfo.version,
  REGISTERED_USER_EMAIL: 'Ti@gmail.com',
  REGISTERED_USER_PASSWORD: 'TestTest99!',
  COMMAND: 'start smtp4dev'
};
