# preact-shared-state-hook

![Types: included](https://badgen.net/npm/types/preact-shared-state-hook) ![License: WTFPL](https://badgen.net/npm/license/preact-shared-state-hook)

Most straightforward way to create shareable state hooks for Preact.  
It's only 20 lines of [source code](https://github.com/luncheon/preact-shared-state-hook/blob/main/index.js).

## Installation

```bash
$ npm i preact-shared-state-hook
```

## Usage

Create state hooks with `createSharedState()` and use it in components.

```jsx
import { h, render } from "preact"
import { memo } from "preact/compat"
import { createSharedState } from "preact-shared-state-hook"

// create state hook
const [useCount, setCount] = createSharedState(0)

const Counter = memo(() => {
  // use state hook
  const count = useCount()
  return <button type="button" onClick={() => setCount(count + 1)}>{count}</button>
})

render(<Counter />, document.body.appendChild(document.createElement('main')))
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

The state can be shared by multiple components.

```jsx
import { h, render, Fragment } from 'preact'
import { memo } from "preact/compat"
import { createSharedState } from "preact-shared-state-hook"

const [useCount, setCount] = createSharedState(0)
const increment = () => setCount(count => count + 1)
const reset = () => setCount(0)

const Counter = memo(() => {
  const count = useCount()
  return <button type="button" onClick={increment}>{count}</button>
})

const Reset = memo(() => {
  return <button type="button" onClick={reset}>Reset</button>
})

const Badge = memo(() => {
  const count = useCount()
  return <div>{count}</div>
})

const App = memo(() => {
  return (
    <Fragment>
      <Counter />
      <Reset />
      <Badge />
    </Fragment>
  )
})

render(<App />, document.body.appendChild(document.createElement('main')))
```

[CodeSandbox](https://codesandbox.io/s/grhvh?file=/src/index.tsx)

## API

```ts
createSharedState<S>(initialState: S) => [
  /* useSharedState: */ () => S,
  /* setSharedState: */ (state: S | ((previousState: S) => S)) => void,
]
```

The first returned value `useSharedState` must be called in functional components.  
`useSharedState()` returns current state.

The second returned value `setSharedState` can be called anywhere.  
`setSharedState()` re-renders the components that have called `useSharedState()`.

## Memoized Selectors

[memoize-one](https://github.com/alexreardon/memoize-one) can be used.

```js
import memoizeOne from "memoize-one"
import { h, render, Fragment } from "preact"
import { memo } from "preact/compat"
import { createSharedState } from "preact-shared-state-hook"

const [useNames, setNames] = createSharedState(['Alice', 'Bob', 'Charlie'])
const [useSearchWord, setSearchWord] = createSharedState('')

// memoized selector
const useFilteredNames = (() => {
  const selector = memoizeOne((names, searchWord) => names.filter(name => name.includes(searchWord)))
  return () => selector(useNames(), useSearchWord())
})()

const InputName = memo(() => {
  return (
    <form onSubmit={event => {
      event.preventDefault()
      setNames(names => [...names, event.currentTarget.name.value])
    }}>
      <input name="name" placeholder="Name" />
      <button>Add</button>
    </form>
  )
})

const InputSearchWord = memo(() => {
  const searchWord = useSearchWord()
  return <input placeholder="Search" value={searchWord} onInput={event => setSearchWord(event.currentTarget.value)} />
})

const FilteredNames = memo(() => {
  const filteredNames = useFilteredNames()
  return <ul>{filteredNames.map(name => <li>{name}</li>)}</ul>
})

const App = memo(() => {
  return (
    <Fragment>
      <InputName />
      <InputSearchWord />
      <FilteredNames />
    </Fragment>
  )
})

render(<App />, document.body.appendChild(document.createElement('main')))
```

[CodeSandbox](https://codesandbox.io/s/vp1bx?file=/src/index.tsx)

## License

[WTFPL](http://www.wtfpl.net)
