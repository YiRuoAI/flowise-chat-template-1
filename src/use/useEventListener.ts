export interface Listener {
  addEventListener: (
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => void
  removeEventListener: (
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => void
  [key: string]: any
}

export function useEventListener(
  scope: Listener | undefined,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) {
  scope?.addEventListener(type, handler, options)
  return () => {
    scope?.removeEventListener(type, handler, options)
  }
}
