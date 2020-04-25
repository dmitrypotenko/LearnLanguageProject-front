const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const distFolder = path.join(process.cwd(), 'dist/browser');

app.set('trust proxy', true);
const redirectRules = function (req, res, next) {
  if (req.hostname.startsWith('www.')) {
    res.redirect(301, 'https://lessonsbox.com' + req.originalUrl);
  } else {
    next();
  }
};



app.use(redirectRules);

app.get('/robots.txt', function (req, res, next) {
  var options = {
    root: distFolder
  };

  res.sendFile('assets/robots.txt', options, function (err) {
    if (err) {
      next(err)
    }
  })
});


app.get('/donate', function (req, res, next) {
  var options = {
    root: distFolder
  };

  res.sendFile('donate/index.html', options, function (err) {
    if (err) {
      next(err)
    }
  })
});

app.use(express.static(distFolder));

app.get('/*', function (req, res, next) {
  var options = {
    root: distFolder
  };

  res.sendFile('index.html', options, function (err) {
    if (err) {
      next(err)
    }
  })
});


app.listen(port, () => console.log(`Front server is listening at http://localhost:${port}`));
