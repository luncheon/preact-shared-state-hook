import { useEffect, useState } from 'preact/hooks'

const emptyArray = []

export const createSharedState = currentState => {
  const listeners = new Set()
  const useSharedState = () => {
    const setState = useState()[1]
    useEffect(() => (listeners.add(setState), () => listeners.delete(setState)), emptyArray)
    return currentState
  }
  useSharedState.listeners = listeners
  useSharedState.snapshot = () => currentState
  return [
    useSharedState,
    state => {
      currentState = typeof state === 'function' ? state(currentState) : state
      listeners.forEach(listener => listener(currentState))
    },
  ]
}

export const createSharedSelector = (hooks, compute) => {
  const applyComputation = () => compute(...hooks.map(hook => hook.snapshot()))
  const [use, set] = createSharedState(applyComputation())
  const update = () => set(applyComputation())
  hooks.forEach(hook => hook.listeners.add(update))
  return use
}
