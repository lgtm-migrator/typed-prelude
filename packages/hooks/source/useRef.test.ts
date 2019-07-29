import { describe, given, it } from '@typed/test'
import { useRef } from './useRef'
import { withHooks } from './withHooks'

export const test = describe(`useRef`, [
  it(`returns MutableRefObject`, ({ equal, same }) => {
    const value = 1
    const fn = withHooks(() => useRef<typeof value>())

    equal(null, fn().current)
    same(fn(), fn())

    fn().current = value

    equal(value, fn().current)

    fn.context.dispose()

    equal(null, fn().current)
  }),

  given(`a starting value`, [
    it(`returns MutableRefObject start with given value`, ({ same }) => {
      const value = { value: 1 }
      const fn = withHooks(() => useRef(value))

      same(value, fn().current)
    }),
  ]),
])