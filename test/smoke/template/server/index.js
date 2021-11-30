const express = require('express');
const { renderToString } = require('react-dom/server');
const ssr = require('../dist/search-server.js')
if (typeof window === 'undefined') {
  global.window = {}
}
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8')

const server = (port) => {
  const app = express();
  app.use(express.static('dist'))
  app.get('/search',(req,res) => {
    const html = renderMarkUp(renderToString(ssr))
    res.status(200).send(html)
  })
  app.listen(port, () => {
    console.log('server is running on port 3000')
  })
};

server(process.env.port|| 3000);

const renderMarkUp = (str) => {
  return template.replace('<!--HTMLPLACEHOLDER-->', str)
}