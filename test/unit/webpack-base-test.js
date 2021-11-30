const assert = require('assert');

describe('webpack.base.test base',() => {
  const baseConfig = require('../../lib/webpack.base.js');
  console.log(baseConfig, 'baseconfig')
  it('entry', () => {
    assert.equal(baseConfig.entry.index, 'D:/test/buildWebpack/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search, 'D:/test/buildWebpack/test/smoke/template/src/search/index.js')
  })
})