# preact-shared-state-hook

![Types: included](https://badgen.net/npm/types/preact-shared-state-hook) ![License: WTFPL](https://badgen.net/npm/license/preact-shared-state-hook)

Most straightforward way to create shareable state hooks for Preact.  
It's only 30 lines of [source code](https://github.com/luncheon/preact-shared-state-hook/blob/main/index.js).

## Installation

```bash
$ npm i preact-shared-state-hook
```

## Usage

Create state hooks with `createSharedState()` and use them in components.  
The state value can be shared by multiple components.

```jsx
import { h, render } from "preact"
import { memo } from "preact/compat"
import { createSharedState } from "preact-shared-state-hook"

// create a state hook
const [useCount, setCount] = createSharedState(0)

const Counter = memo(() => {
  // use the state value
  const count = useCount()
  return <button type="button" onClick={() => setCount(count + 1)}>{count}</button>
})

render(<Counter />, document.body.appendChild(document.createElement('main')))
```

Create computation hooks with `createSharedSelector()` and use them in components.  
The computed value can be shared by multiple components.

```jsx
import { h, render, Fragment } from "preact"
import { memo } from "preact/compat"
import { createSharedState, createSharedSelector } from "preact-shared-state-hook"

const [useCount1, setCount1] = createSharedState(0)
const [useCount2, setCount2] = createSharedState(0)

// create a computation hook
const useProduct = createSharedSelector([useCount1, useCount2], (count1, count2) => count1 * count2)

const Counter = memo(() => {
  const count1 = useCount1()
  const count2 = useCount2()
  return (
    <Fragment>
      <button type="button" onClick={() => setCount1(count1 + 1)}>{count1}</button>
      <button type="button" onClick={() => setCount2(count2 + 1)}>{count2}</button>
    </Fragment>
  )
})

const Product = memo(() => {
  // use the computed value
  const product = useProduct()
  return <div>{product}</div>
})

const App = memo(() => {
  return (
    <Fragment>
      <Counter />
      <Product />
    </Fragment>
  )
})

render(<App />, document.body.appendChild(document.createElement('main')))
```

Actions can be predefined.

```jsx
import { h, render } from "preact"
import { memo } from "preact/compat"
import { createSharedState } from "preact-shared-state-hook"

const [useCount, setCount] = createSharedState(0)

// action
const increment = () => setCount(count => count + 1)

const Counter = memo(() => {
  const count = useCount()
  return <button type="button" onClick={increment}>{count}</button>
})

render(<Counter />, document.body.appendChild(document.createElement('main')))
```

[CodeSandbox](https://codesandbox.io/s/preact-shared-state-hook-example-i6qi2?file=/index.tsx)

## API

### createSharedState

```ts
const [useSharedState, setSharedState] = createSharedState(initialState)

const state = useSharedState()

setSharedState(nextState)
setSharedState(state => nextState)
```

Creates a hook to share a state.

The first returned value `useSharedState()` returns the current state value.  
`useSharedState()` must be called in functional components.

The second returned value `setSharedState()` updates the state and re-renders the components that have called `useSharedState()`.  
`setSharedState()` accepts a new state value or a function that computes a new state value from an old state value.  
`setSharedState()` can be called anywhere.

### createSharedSelector

```ts
const useSharedSelector = createSharedSelector([useSharedState1, useSharedState2, ...], (state1, state2, ...) => value)

const value = useSharedSelector()
```

Creates a hook to compute a value from some shared states.  
`useSharedSelector()` must be called in functional components.

## License

[WTFPL](http://www.wtfpl.net)
