import { useEffect } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'motion/react'

// Нормализованная позиция курсора (−1…1) со сглаживанием. На тач-устройствах остаётся 0:
// там глубину даёт параллакс при скролле.
export function usePointerParallax(): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 18 })
  const y = useSpring(rawY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [rawX, rawY])

  return { x, y }
}
