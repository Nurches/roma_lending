import type { Transition } from 'motion/react'

// Плавный «выдох» в конце движения — основная кривая лендинга.
export const easeOut = [0.22, 1, 0.36, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 140, damping: 18, mass: 0.9 }

// Элемент проявляется, когда 35% его площади попало в экран; повторно не играет.
export const inView = { once: true, amount: 0.35 } as const

// Бесконечное «парение» для карточек-стикеров.
export const float = (amplitude: number, duration: number, delay = 0) => ({
  animate: { y: [0, -amplitude, 0], rotate: [0, amplitude * 0.3, 0] },
  transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const },
})
