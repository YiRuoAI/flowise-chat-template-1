import { onMounted, onUnmounted } from 'vue'

import { useEventListener } from './useEventListener'

export function useScroll(dom: Document | HTMLElement, cb: (e?: Event) => any) {
  let unListen = () => {}
  onMounted(() => {
    unListen = useEventListener(dom, 'scroll', (e) => {
      cb(e)
    })
  })
  onUnmounted(() => {
    unListen()
  })
}
