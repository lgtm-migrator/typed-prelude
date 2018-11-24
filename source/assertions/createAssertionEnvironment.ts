import { equal } from './equal'
import { notEqual } from './notEqual'
import { notOk } from './notOk'
import { notSame } from './notSame'
import { ok } from './ok'
import { rejects } from './rejects'
import { same } from './same'
import { throws } from './throws'

export interface AssertionEnvironment {
  readonly context: AssertionContext
  readonly assertions: Assertions
}

export interface Assertions {
  readonly equal: typeof equal
  readonly notEqual: typeof notEqual
  readonly notOk: typeof notOk
  readonly notSame: typeof notSame
  readonly ok: typeof ok
  readonly rejects: typeof rejects
  readonly same: typeof same
  readonly throws: typeof throws
}

export interface AssertionContext {
  count: number
}

export function createAssertionEnvironment(): AssertionEnvironment {
  const context: AssertionContext = { count: 0 }

  return {
    context,
    assertions: {
      equal: wrapAssertionInProxy(equal, context),
      notEqual: wrapAssertionInProxy(notEqual, context),
      notOk: wrapAssertionInProxy(notOk, context),
      notSame: wrapAssertionInProxy(notSame, context),
      ok: wrapAssertionInProxy(ok, context),
      rejects: wrapAssertionInProxy(rejects, context),
      same: wrapAssertionInProxy(same, context),
      throws: wrapAssertionInProxy(throws, context),
    },
  }
}

function wrapAssertionInProxy<A extends Function>(fn: A, context: AssertionContext): A {
  return new Proxy(fn, {
    apply(target, that, args) {
      context.count++

      return target.apply(that, args)
    },
  })
}
