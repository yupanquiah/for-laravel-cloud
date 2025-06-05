import type { route as routeFn } from 'ziggy-js'

declare global {
  const route: typeof routeFn
}

declare module 'canvas-confetti' {
  const confetti: any
  export default confetti
}
