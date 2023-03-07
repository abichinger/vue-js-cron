import core, { CronCore, CronCorePlugin, foo, locale, RenderlessSelect, util } from '../src/index.js'

test('exports', () => {
  expect('install' in core)
  expect(CronCore !== undefined)
  expect(CronCorePlugin !== undefined)
  expect(RenderlessSelect !== undefined)
  expect(util !== undefined)
  expect(locale !== undefined)
  expect(foo === undefined)
})
