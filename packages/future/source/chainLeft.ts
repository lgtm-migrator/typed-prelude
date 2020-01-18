import { handle } from '@typed/env'
import { Arity1, curry } from '@typed/lambda'
import { fork } from './fork'
import { Future } from './Future'

export const chainLeft = curry(__chainLeft) as {
  <A, E1, B, C, E2>(fn: Arity1<A, Future<E1, B, C>>, future: Future<E2, A, C>): Future<
    E1 & E2,
    B,
    C
  >

  <A, E1, B, C>(fn: Arity1<A, Future<E1, B, C>>): <E2>(
    future: Future<E2, A, C>,
  ) => Future<E1 & E2, B, C>
}

function __chainLeft<A, E1, B, C, E2>(
  fn: Arity1<A, Future<E1, B, C>>,
  future: Future<E2, A, C>,
): Future<E1 & E2, B, C> {
  return Future.create((reject, resolve, env) => {
    return fork(
      (left: A) => fork(reject, resolve, handle(env, fn(left))),
      resolve,
      handle(env, future),
    )
  })
}
