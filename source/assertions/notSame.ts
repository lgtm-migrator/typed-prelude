import { curry } from '@typed/lambda'
import { notStrictEqual } from 'power-assert'

export const notSame: {
  <A>(expected: A, actual: A): A
  <A>(expected: A): (actual: A) => A
} = curry(
  <A>(expected: A, actual: A): A => {
    notStrictEqual(actual, expected)

    return actual
  },
)
