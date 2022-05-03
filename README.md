## Purpose of this Repo

In v13 of Angular, the [deployUrl](https://angular.io/guide/deployment#the-deploy-url) was deprecated and users were encouraged to use the [base tag](https://angular.io/guide/deployment#the-base-tag) (ie. `baseHref`) instead.

## Issue with `baseHref`

`baseHref` only works if the assets are served from _the same domain_ as the `index.html` (ie. "the index file(s)"). This greatly limits and even blocks some Angular applications.

There are times/limitations when the actual index file of the app is hosted on a separate domain. In this example, we use
hash routing because we do not have the ability to change our server to support the `PathLocationStrategy`.

## About This Reproduction App

This reprository is a simple app to show the limitation. High level overview of this demo app:

* The app name is **"Thor"**
* The assets will be hosted on a "cdn" located at: `http:localhost:8080/fake-cdn/` (this is where we would "upload" our `dist/` folder after being built)
* The app's `index.html` will be hosted (ie. "deployed") on a separate domain located at: `http://localhost:4200/thor/`.
* The app uses `HashLocationStrategy` for routing:
     ``` ts
     RouterModule.forRoot(routes, {
       useHash: true
     })
     ```
* The app uses the [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack) builder to inject the build arguments into the `environment.ts` file. (See `webpack.config.js` and `src/environment.ts`).
  This builder is not doing anything else.
* This app is built using the `development` configuration just for easy of use.

## Testing It Out

Clone and install:
``` sh
# clone the repo
git clone git@github.com:djhouseknecht/angular-deploy-url-repro.git

# cd into it
cd angular-deploy-url-repro

# install
npm install
```

### Using only `baseHref`
Build the app:
``` sh
npm run build:basehref
```

> This build uses: `--baseHref=http://localhost:8080/fake-cdn/` which points to where our assets are uploaded.

Start the cdn and app servers:
``` sh
npm start
```

Go to the app at: http://localhost:4200/thor/

The `index.html` will have:
``` html
<head>
  <base href="http://localhost:8080/fake-cdn/">
  <!-- ... -->
</head>
<body>
  <script src="main.js" type="module"></script>
  <!-- ... -->
</body>
```

You will see the following error:
```
Unhandled Navigation Error: SecurityError: Failed to execute 'replaceState' on 'History': A history state object with URL 'http://localhost:8080/fake-cdn/#/' cannot be created in a document with origin 'http://localhost:4200' and URL 'http://localhost:4200/thor/'.
```

The `<base href="..." />` cannot be on a separate domain in order for hash routing to work.

> Note: we cannot use the `--baseHref=http://localhost:4200/thor/` because the assets aren't there.
> They are only located on the cdn url.
### Using `deployUrl` along side `baseHref`
Build the app:
``` sh
npm run build:deployurl
```

> This build uses: `--deployUrl=http://localhost:8080/fake-cdn/` which is where our assets are uploaded and `--baseHref=/thor/` which is where the index file is uploaded. You will get the deprecation notice:
> ```
> Option "deployUrl" is deprecated: Use "baseHref" option, "APP_BASE_HREF" DI token or a combination of both instead. For more information, see https://angular.io/guide/deployment#the-deploy-url.
> ```

Start the cdn and app servers:
``` sh
npm start
```

Go to the app at: http://localhost:4200/thor/

The `index.html` will have:
``` html
<head>
  <base href="/thor/">
  <!-- ... -->
</head>
<body>
  <script src="http://localhost:8080/fake-cdn/main.js" type="module"></script>
  <!-- ... -->
</body>
```

There are no errors and the routing works. This is the current and desired behavior.
I am all in favor of deprecation and improving APIs, builds, bundle size, etc.
However, this appears to have major breaking changes with no apparent solution.

If there is a workaround/solution, I have not found it. The only option I see currently is to have
some kind of post build process update the `src` tags in the generated `index.html` file.
But this seems really hacky and brittle. It seems like there should be a better way to handle this scenario.