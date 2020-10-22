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
  let currentValue = compute(...hooks.map(hook => hook.snapshot()))
  const listeners = new Set()
  const update = () => {
    currentValue = compute(...hooks.map(hook => hook.snapshot()))
    listeners.forEach(listener => listener(currentValue))
  }
  hooks.forEach(hook => hook.listeners.add(update))

  const useSharedSelector = () => {
    const setState = useState()[1]
    useEffect(() => (listeners.add(setState), () => listeners.delete(setState)), emptyArray)
    return currentValue
  }
  useSharedSelector.listeners = listeners
  useSharedSelector.snapshot = () => currentValue
  return useSharedSelector
}
