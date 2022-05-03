const yargs = require('yargs/yargs')
const webpack = require('webpack');

const argv = { ...yargs(process.argv).argv };

/* just some clean up for logs */
delete argv._;
delete argv['$0'];

console.log('\n');
console.log('Building with arguments:', argv);
console.log('\n');

const cdnUrl = argv.baseHref || '/';

if (!cdnUrl) {
  /* `baseHref` is required for prod builds */
  if (argv.configuration === 'production') {
    console.error(
      'Attempting to make a production build without a `baseHref`. ' +
      'Please pass in a `baseHref` for production builds.\n' +
      '  Example: `npm run build:prod -- --baseHref=https://cdn.com/my-app/`\n\n' +
      'Provided build arguments: ', argv
    );
    process.exit(1);
  }
}

/* make sure the servePath ends with a trailing slash */
if (!cdnUrl.endsWith('/')) {
  console.error(
    '`baseHref` must end with a trailing backslash (`/`). \n\n' +
    `Provided build arguments: "${cdnUrl}"`
  );
  process.exit(1);
}

/* this config gets merged with Angular's webpack config */
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      __CDN_URL__: JSON.stringify(cdnUrl)
    })
  ]
}
