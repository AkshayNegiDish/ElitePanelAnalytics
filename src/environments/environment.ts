// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  //baseURL: 'http://analytics.mysmartstick.com',
  //baseURL: 'http://52.66.239.16:3009',
  baseURL: 'http://127.0.0.1:3009',
  catchUpURL: '/apps/video_mediashare/index.html?url='
};
