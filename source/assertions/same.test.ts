import { describe, given, it, Test } from '@typed/test'

import { same } from './same'

export const test: Test = describe(`same`, [
  given(`an expected and actual value`, [
    it(`returns actual value if assertion is true`, ({ equal }) => {
      const expected = 2
      const actual = 2

      equal(actual, same(expected, actual))
    }),

    it(`throws an error if assertion is false`, ({ notOk }) => {
      const expected = 1
      const actual = 2

      try {
        same(expected, actual)
        throw new Error(`Should throw error`)
      } catch (e) {
        notOk(e.message === `Should throw error`)
      }
    }),
  ]),
])