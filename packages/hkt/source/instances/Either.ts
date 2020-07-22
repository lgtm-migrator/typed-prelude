import { Either, map } from '@typed/either'
import { Functor } from '../type-classes/Functor'
import { TypeParams } from './TypeParams'

declare module '../type-classes/Hkt' {
  export interface Hkts<Values> {
    readonly Either: Either<TypeParams.Second<Values>, TypeParams.First<Values>>
  }

  export interface HktValues<T> {
    readonly Either: () => [T] extends [Either<infer A, infer B>] ? [A, B] : never
  }
}

export const either: Functor<'Either'> = {
  map,
}