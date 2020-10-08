import { useEffect, useState } from 'preact/hooks'

const emptyArray = []

export const createSharedState = currentState => {
  const listeners = new Set()
  return [
    () => {
      const setState = useState()[1]
      useEffect(() => (listeners.add(setState), () => listeners.delete(setState)), emptyArray)
      return currentState
    },
    state => {
      currentState = typeof state === 'function' ? state(currentState) : state
      for (const listener of listeners) {
        listener(currentState)
      }
    },
  ]
}
