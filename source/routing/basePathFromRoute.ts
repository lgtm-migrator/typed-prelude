import { Path } from '@typed/history'
import { chain, withDefault } from '@typed/maybe'
import { Route } from './types'

export function basePathFromRoute<A>(path: Path, { match, createPath }: Route<A>): string {
  return withDefault('/', chain(createPath, match(path)))
}