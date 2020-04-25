import 'zone.js/dist/zone-node';
import {ngExpressEngine} from '@nguniversal/express-engine';
import * as express from 'express';
import {join} from 'path';


import {APP_BASE_HREF} from '@angular/common';
import {existsSync} from 'fs';

const fs = require('fs');
var domino = require('domino');
/*var canvas = require('canvas');
const jsdom = require('jsdom');
global['DOMParser'] = new jsdom.JSDOM().window.DOMParser;*/
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();
global['navigator'] = mock.getNavigator();
global['Image'] = function () {
  return win.document.createElement('img')
};
const template = fs.readFileSync('dist/browser/index.html').toString();
const win = domino.createWindow(template);
Object.assign(global, domino.impl);
global['window'] = win;
global['document'] = win.document;

// othres mock
global['CSS'] = null;

global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

import {AppServerModule} from './src/main.server';

/*const { enableProdMode } = require('@angular/core');

enableProdMode();*/

// not implemented property and functions
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
// mock documnet


// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('trust proxy', true);
  const redirectRules = function (req, res, next) {
    if (req.hostname.startsWith('www.')) {
      res.redirect(301, 'https://lessonsbox.com' + req.originalUrl);
    } else {
      next();
    }
  };


  server.use(redirectRules);

  server.get('/robots.txt', function (req, res, next) {
    var options = {
      root: distFolder
    };

    res.sendFile('assets/robots.txt', options, function (err) {
      if (err) {
        next(err)
      }
    })
  });

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4200;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
