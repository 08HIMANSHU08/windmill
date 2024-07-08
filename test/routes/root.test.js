'use strict'

// const { test } = require('node:test') //<---es5
import test from 'node:test';
// const assert = require('node:assert') //<---es5
import assert from 'node:assert';
// const { build } = require('../helper') //<---es5
import build from '../helper.js'

test('default root route', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/'
  })
  assert.deepStrictEqual(JSON.parse(res.payload), { root: true })
})

// inject callback style:
//
// test('default root route', (t) => {
//   t.plan(2)
//   const app = await build(t)
//
//   app.inject({
//     url: '/'
//   }, (err, res) => {
//     t.error(err)
//     assert.deepStrictEqual(JSON.parse(res.payload), { root: true })
//   })
// })
