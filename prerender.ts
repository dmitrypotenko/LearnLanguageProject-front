// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {Express} from 'express';
import {app} from './express-app';
import {existsSync, mkdirSync,  writeFileSync} from 'fs';
import {join} from 'path';
import * as request from 'request-promise';
import {ROUTES} from './static.paths';

const BROWSER_FOLDER = join(process.cwd(), 'dist/browser');

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
