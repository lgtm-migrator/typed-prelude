import { curry } from '@typed/lambda'

export const update = curry(function update<A>(index: number, value: A, list: A[]): A[] {
  const length = list.length
  const newList = list.slice()

  if (length === 0 || index < 0 || index >= length) {
    return newList
  }

  newList[index] = value

  return newList
}) as {
  <A>(index: number, value: A, list: A[]): A[]
  <A>(index: number, value: A): (list: A[]) => A[]
  (index: number): {
    <A>(value: A, list: A[]): A[]
    <A>(value: A): (list: A[]) => A[]
  }
}
