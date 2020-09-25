# preact-shared-state-hook

Most straightforward way to create shareable state hooks for Preact.

## Installation

```bash
$ npm i preact-shared-state-hook
```

## Usage

Create a shared state hook with `createSharedState()` and use it in components.

```jsx
import { h, render } from "preact"
import { memo } from "preact/compat"
import { createSharedState } from "preact-shared-state-hook"

const [useCount, setCount] = createSharedState(0)

const Counter = memo(() => {
  const count = useCount()
  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
})
```

Increment function can be predefined.

```jsx
import { h, render } from "preact"
import { memo } from "preact/compat"
import { createSharedState } from "preact-shared-state-hook"

const [useCount, setCount] = createSharedState(0)
const increment = () => setCount(count => count + 1)

const Counter = memo(() => {
  const count = useCount()
  return (
    <button type="button" onClick={increment}>
      {count}
    </button>
  )
})
```

The state can be shared by multiple components.

```jsx
import { h, render } from "preact"
import { memo } from "preact/compat"
import { createSharedState } from "preact-shared-state-hook"

const [useCount, setCount] = createSharedState(0)
const increment = () => setCount(count => count + 1)
const reset = () => setCount(0)

const Counter = memo(() => {
  const count = useCount()
  return (
    <button type="button" onClick={increment}>
      {count}
    </button>
  )
})

const Reset = memo(() => {
  return (
    <button type="button" onClick={reset}>
      Reset
    </button>
})

const Badge = memo(() => {
  const count = useCount()
  return <div>{count}</div>
})

const App = () => (
  <main>
    <Counter />
    <Reset />
    <Badge />
  </main>
)
```

## API

```ts
createSharedState<S>(initialState: S) => [
  /* useSharedState: */ () => S,
  /* setSharedState: */ (state: S | ((prevState: S) => S)) => void,
]
```

The first returned value `useSharedState` must be called in functional components.  
`useSharedState()` returns current state.

The second returned value `setSharedState` can be called anywhere.  
`setSharedState()` re-renders the components that have called `useSharedState()`.

## Memoization

[memoize-one](https://github.com/alexreardon/memoize-one) can be used.

```js
import memoizeOne from "memoize-one"
import { createSharedState } from "preact-shared-state-hook"

const [usePoint1, setPoint1] = createSharedState({ x: 10, y: 20 })
const [usePoint2, setPoint2] = createSharedState({ x: 30, y: 10 })

const useDistance = (() => {
  const calculateDistance = memoizeOne((p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2))
  return () => calculateDistance(usePoint1(), usePoint2())
})()

const DistanceIndicator = () => {
  const distance = useDistance()
  return <div>{distance}</div>
}
```

## License

[WTFPL](http://www.wtfpl.net)
