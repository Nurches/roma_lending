import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { Hero } from './components/Hero/Hero'
import { Program } from './components/Program/Program'
import s from './App.module.scss'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <main className={s.page}>
          <Hero />
          <Program />
        </main>
      </MotionConfig>
    </LazyMotion>
  )
}
