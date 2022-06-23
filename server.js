const express = require('express');
const app = express();
const cors = require('cors');
const packageJson = require('./package.json')

// Middleware
app.use(requireHTTPS);
app.use(express.static('./dist/' + packageJson.name));

// Redirect app request to index.html
app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/' + packageJson.name});
});

const corsOptions = {origin: process.env.URL || '*', credentials: true};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
});

// Start server
app.listen(process.env.PORT || 8080, () => console.log('Server started...'));

/**
 * @author: Klement Omeri
 * Special thanks to Klement for providing the function to redirect traffic from http to https
 */
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
