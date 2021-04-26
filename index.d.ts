export interface UseSharedState<S> {
  (): S
  snapshot: () => S
}

export declare const createSharedState: <S>(initialState: S) => [UseSharedState<S>, (state: S | ((previousState: S) => S)) => void]
export declare const createSharedSelector: <SharedStates extends readonly any[], S>(
  useSharedStates: { readonly [index in keyof SharedStates]: () => SharedStates[index] },
  compute: (...sharedStates: SharedStates) => S,
) => UseSharedState<S>
