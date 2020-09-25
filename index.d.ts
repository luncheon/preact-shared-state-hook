export declare const createSharedState: <S>(initialState: S) => [() => S, (state: S | ((prevState: S) => S)) => void]
