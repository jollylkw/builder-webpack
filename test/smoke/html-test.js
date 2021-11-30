const { it } = require("mocha")
const glob = require('glob-all');
describe('checking gen html files', () => {
  it('should gen html files', (done) => {
    const files = glob.sync([
      './dist/index.html',
      './dist/search.html'
    ])
    if (files.length > 0) {
      done();
    } else {
      throw new Error('no html files gen')
    }
  })
})