'use strict'

// const { test } = require('node:test') //<---es5
import { test } from 'node:test';
// const assert = require('node:assert') //<---es5
import assert from 'node:assert';
// const { build } = require('../helper') //<---es5
import { build } from '../helper.js';

test('example is loaded', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/example'
  })
  assert.equal(res.payload, 'this is an example')
})

// inject callback style:
//
// test('example is loaded', (t) => {
//   t.plan(2)
//   const app = await build(t)
//
//   app.inject({
//     url: '/example'
//   }, (err, res) => {
//     t.error(err)
//     assert.equal(res.payload, 'this is an example')
//   })
// })
