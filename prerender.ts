// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {Express} from 'express';
import {app} from './express-app';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import * as request from 'request-promise';
import {enableProdMode} from '@angular/core';
// Import module map for lazy loading
import {ROUTES} from './static.paths';

var domino = require('domino');
const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

const template = readFileSync('./dist/browser/index.html').toString();
// for mock global window by domino
const win = domino.createWindow(template);
global['window'] = win;
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
global['document'] = win.document;
// othres mock
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;
global['navigator'] = mock.getNavigator();

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

const BROWSER_FOLDER = join(process.cwd(), 'dist/browser');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join(BROWSER_FOLDER, 'index.html'), 'utf8');

var retry = 0;

function prerender(expressApp: Express, routes: string[]) {
  const PORT = process.env.PRERENDER_PORT || 4000;

  async function extracted() {
    for (const route of routes) {
      const result = await request.get(`http://localhost:${PORT}${route}`);
      const fullPath = join(BROWSER_FOLDER, route);
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath);
      }
      writeFileSync(join(fullPath, 'index.html'), result);
    }
  }

// Start up the Node server
  const server = expressApp.listen(PORT, async () => {
    var exit = false;
    while (!exit) {
      try {
        await extracted();
        exit = true;
      } catch (error) {
        if (error.code != 'ECONNRESET') {
          exit = true;
        }
        retry++;
        console.log('Retry ' + retry);
        console.log('CODE ' + error);
        console.log(error);
      }
    }
    console.log('Prerender complete.');
    server.close();
  });
}

prerender(app, ROUTES);
