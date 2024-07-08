'use strict'

// const { test } = require('node:test') //<---es5
import {test} from 'node:test';
// const assert = require('node:assert') //<---es5
import assert from 'node:assert';

// const Fastify = require('fastify') //<---es5
import Fastify from 'fastify';
// const Support = require('../../plugins/support') //<---es5
import Support from '../plugins/support' //FILE NOT IN USE

test('support works standalone', async (t) => {
  const fastify = Fastify();
  fastify.register(Support);

  await fastify.ready();
  assert.equal(fastify.someSupport(), 'hugs');
});

// You can also use plugin with opts in fastify v2
//
// test('support works standalone', (t) => {
//   t.plan(2)
//   const fastify = Fastify()
//   fastify.register(Support)
//
//   fastify.ready((err) => {
//     t.error(err)
//     assert.equal(fastify.someSupport(), 'hugs')
//   })
// })
