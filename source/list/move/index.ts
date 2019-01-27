import { curry, id } from '@typed/lambda'
import { equals, greaterThan, ifElse, lessThan, or } from '@typed/logic'
import { decrement, increment } from '@typed/math'

export const move = curry(__move) as {
  <A>(fromIndex: number, toIndex: number, list: A[]): A[]
  (fromIndex: number, toIndex: number): <A>(list: A[]) => A[]
  (fromIndex: number): {
    <A>(toIndex: number, list: A[]): A[]
    (toIndex: number): <A>(list: A[]) => A[]
  }
}

function __move<A>(fromIndex: number, toIndex: number, list: A[]): A[] {
  const length = list.length
  const newArray = Array(length)

  if (outOfBounds(length, toIndex) || outOfBounds(length, fromIndex)) {
    return list
  }

  for (let i = 0; i < length; ++i) {
    newArray[i] = list[findMovedIndex(i, fromIndex, toIndex)]
  }

  return newArray
}

function findMovedIndex(i: number, fromIndex: number, toIndex: number): number {
  if (equals(i, toIndex)) {
    return fromIndex
  }

  return ifElse(
    () => lessThan(toIndex, fromIndex),
    ifElse(between(fromIndex, toIndex), id, increment),
    ifElse(between(toIndex, fromIndex), id, decrement),
    i,
  )
}

function outOfBounds(length: number, value: number) {
  return value < 0 || value >= length
}

function between(min: number, max: number): (num: number) => boolean {
  return or(lessThan(min), greaterThan(max))
}
