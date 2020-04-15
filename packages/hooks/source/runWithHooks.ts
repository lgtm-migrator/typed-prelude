import { combine, Effects, runWith } from '@typed/effects'
import { HookEffects, HookEnvironment } from './types'

// Run nested environments with their own hookEnvironment
export function* runWithHooks<A, B>(
  effect: HookEffects<A, B>,
  hookEnvironment: HookEnvironment,
): Effects<A, B> {
  // Cleanup to ensure always starting from id=0
  yield* combine(hookEnvironment.clearUpdated(), hookEnvironment.resetId())

  return yield* runWith(effect, { hookEnvironment }) as Effects<A, B>
}
