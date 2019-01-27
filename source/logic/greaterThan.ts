import { curry } from '@typed/lambda'

export const greaterThan = curry(<A>(right: A, left: A) => left > right) as {
  <A>(right: A, left: A): boolean
  <A>(right: A): (left: A) => boolean
}
