export declare const createSharedState: <S>(initialState: S) => [() => S, (state: S | ((previousState: S) => S)) => void]
export declare const createSharedSelector: <SharedStates extends readonly any[], S>(
  useSharedStates: { readonly [index in keyof SharedStates]: () => SharedStates[index] },
  compute: (...sharedStates: SharedStates) => S,
) => () => S
