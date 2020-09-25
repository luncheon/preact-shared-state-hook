import { useEffect, useState } from 'preact/hooks'

const emptyArray = []

export const createSharedState = initialState => {
  const listeners = new Set()
  return [
    () => {
      const setState = useState()[1]
      useEffect(() => (listeners.add(setState), () => listeners.delete(setState)), emptyArray)
      return initialState
    },
    state => {
      initialState = typeof state === 'function' ? state(initialState) : state
      for (const listener of listeners) {
        listener(initialState)
      }
    },
  ]
}
