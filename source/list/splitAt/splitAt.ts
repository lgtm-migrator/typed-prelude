import { curry } from '@typed/lambda'
import { Tuple } from '@typed/tuple'

export const splitAt = curry(
  <A>(index: number, list: A[]): Tuple<A[], A[]> => [list.slice(0, index), list.slice(index)],
) as {
  <A>(index: number, list: A[]): Tuple<A[], A[]>
  <A>(index: number): (list: A[]) => Tuple<A[], A[]>
}
