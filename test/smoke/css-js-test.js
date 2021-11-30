const { it } = require("mocha")
const glob = require('glob-all');
describe('checking gen js csss files', () => {
  it('should gen js css files', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/search_*.js'
    ])
    if (files.length > 0) {
      done();
    } else {
      throw new Error('no js css files gen')
    }
  })
})