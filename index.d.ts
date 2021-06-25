export interface UseSharedState<S> {
  (): S
  snapshot: () => S
}

export declare function createSharedState<S>(initialState: S): [UseSharedState<S>, (state: S | ((previousState: S) => S)) => void]

export declare function createSharedSelector<A, S>(useSharedStates: readonly [UseSharedState<A>], compute: (a: A) => S): UseSharedState<S>
export declare function createSharedSelector<A, B, S>(useSharedStates: readonly [UseSharedState<A>, UseSharedState<B>], compute: (a: A, b: B) => S): UseSharedState<S>
export declare function createSharedSelector<A, B, C, S>(useSharedStates: readonly [UseSharedState<A>, UseSharedState<B>, UseSharedState<C>], compute: (a: A, b: B, c: C) => S): UseSharedState<S>
export declare function createSharedSelector<A, B, C, D, S>(useSharedStates: readonly [UseSharedState<A>, UseSharedState<B>, UseSharedState<C>, UseSharedState<D>], compute: (a: A, b: B, c: C, d: D) => S): UseSharedState<S>
export declare function createSharedSelector<A, B, C, D, E, S>(useSharedStates: readonly [UseSharedState<A>, UseSharedState<B>, UseSharedState<C>, UseSharedState<D>, UseSharedState<E>], compute: (a: A, b: B, c: C, d: D, e: E) => S): UseSharedState<S>
export declare function createSharedSelector<A, B, C, D, E, F, S>(useSharedStates: readonly [UseSharedState<A>, UseSharedState<B>, UseSharedState<C>, UseSharedState<D>, UseSharedState<E>, UseSharedState<F>], compute: (a: A, b: B, c: C, d: D, e: E, f: F) => S): UseSharedState<S>
export declare function createSharedSelector<SharedStates extends readonly unknown[], S>(
  useSharedStates: { readonly [index in keyof SharedStates]: UseSharedState<SharedStates[index]> },
  compute: (...sharedStates: SharedStates) => S,
): UseSharedState<S>
