import assert from 'assert'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-preact-pure'
import { JSDOM } from 'jsdom'
import { h } from 'preact'
import { memo } from 'preact/compat'
import { createSharedState } from '.'

enzyme.configure({ adapter: new Adapter() })

global.window = new JSDOM('<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>').window
global.document = window.document
global.Event = window.Event

const renderedCount = { c1: 0, c2: 0, i1: 0, r1: 0 }

const [useCount1, setCount1] = createSharedState(10)
const [useCount2, setCount2] = createSharedState(20)

const Counter1 = memo(() => {
  renderedCount.c1++
  const count = useCount1()
  return (
    <button id="counter1" type="button" onClick={() => setCount1(c => c + 1)}>
      {count}
    </button>
  )
})
const Counter2 = memo(() => {
  renderedCount.c2++
  const count = useCount2()
  return (
    <button id="counter2" type="button" onClick={() => setCount2(count + 1)}>
      {count}
    </button>
  )
})
const Reset1 = memo(() => {
  renderedCount.r1++
  return (
    <button id="reset1" type="button" onClick={() => setCount1(0)}>
      Reset
    </button>
  )
})
const Indicator1 = memo(() => {
  renderedCount.i1++
  const count = useCount1()
  return <div id="indicator1">{count}</div>
})
const App = () => (
  <main>
    <Counter1 />
    <Counter2 />
    <Indicator1 />
    <Reset1 />
  </main>
)

const app = enzyme.mount(<App />)
const c1 = app.find('#counter1')
const c2 = app.find('#counter2')
const i1 = app.find('#indicator1')
const r1 = app.find('#reset1')
const texts = () => ({ c1: c1.text(), c2: c2.text(), i1: i1.text() })
assert.deepStrictEqual(renderedCount, { c1: 1, c2: 1, i1: 1, r1: 1 })
assert.deepStrictEqual(texts(), { c1: '10', c2: '20', i1: '10' })

c1.simulate('click')
assert.deepStrictEqual(renderedCount, { c1: 2, c2: 1, i1: 2, r1: 1 })
assert.deepStrictEqual(texts(), { c1: '11', c2: '20', i1: '11' })

c1.simulate('click')
assert.deepStrictEqual(renderedCount, { c1: 3, c2: 1, i1: 3, r1: 1 })
assert.deepStrictEqual(texts(), { c1: '12', c2: '20', i1: '12' })

c2.simulate('click')
assert.deepStrictEqual(renderedCount, { c1: 3, c2: 2, i1: 3, r1: 1 })
assert.deepStrictEqual(texts(), { c1: '12', c2: '21', i1: '12' })

c2.simulate('click')
assert.deepStrictEqual(renderedCount, { c1: 3, c2: 3, i1: 3, r1: 1 })
assert.deepStrictEqual(texts(), { c1: '12', c2: '22', i1: '12' })

r1.simulate('click')
assert.deepStrictEqual(renderedCount, { c1: 4, c2: 3, i1: 4, r1: 1 })
assert.deepStrictEqual(texts(), { c1: '0', c2: '22', i1: '0' })

c1.simulate('click')
assert.deepStrictEqual(renderedCount, { c1: 5, c2: 3, i1: 5, r1: 1 })
assert.deepStrictEqual(texts(), { c1: '1', c2: '22', i1: '1' })

console.log('passed')
