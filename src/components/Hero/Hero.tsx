import { useRef } from 'react'
import { m, useScroll, useTransform, type MotionValue } from 'motion/react'
import classroom from '../../assets/classroom.webp'
import glowCenter from '../../assets/glow-center.svg'
import glowCorner from '../../assets/glow-corner.svg'
import teacher from '../../assets/teacher.webp'
import title from '../../assets/title-marathon.svg'
import { CtaButton } from '../CtaButton/CtaButton'
import { easeOut, float, spring } from '../../motion/presets'
import { usePointerParallax } from '../../motion/usePointerParallax'
import s from './Hero.module.scss'

// Искры, медленно поднимающиеся за преподавателем: [left %, top %, размер px, задержка s, длительность s]
const SPARKS: ReadonlyArray<readonly [number, number, number, number, number]> = [
  [8, 62, 3, 0, 7],
  [18, 38, 2, 2.4, 9],
  [27, 74, 2, 1.1, 8],
  [36, 52, 3, 3.6, 10],
  [44, 30, 2, 0.6, 8.5],
  [55, 66, 2, 2.9, 9.5],
  [63, 44, 3, 1.7, 7.5],
  [72, 58, 2, 4.2, 9],
  [81, 34, 3, 0.9, 10.5],
  [90, 70, 2, 3.1, 8],
  [12, 20, 2, 5, 9],
  [86, 16, 2, 1.4, 8.5],
]

// Глубина слоя: сдвиг от курсора (px) + смещение при прокрутке героя за экран (px).
function useDepth(pointer: { x: MotionValue<number>; y: MotionValue<number> }, progress: MotionValue<number>, depth: number, scroll: number) {
  const x = useTransform(() => pointer.x.get() * depth)
  const y = useTransform(() => pointer.y.get() * depth + progress.get() * scroll)
  return { x, y }
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const pointer = usePointerParallax()

  const bgDepth = useDepth(pointer, scrollYProgress, -6, 120)
  const glowDepth = useDepth(pointer, scrollYProgress, 14, -60)
  const titleDepth = useDepth(pointer, scrollYProgress, -4, 90)
  const teacherDepth = useDepth(pointer, scrollYProgress, 6, 70)
  const leftCardDepth = useDepth(pointer, scrollYProgress, -14, -50)
  const rightCardDepth = useDepth(pointer, scrollYProgress, 16, -90)
  const titleFade = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section ref={ref} className={s.hero} aria-labelledby="hero-title">
      <m.div className={s.classroom} style={bgDepth} aria-hidden>
        <m.img
          src={classroom}
          alt=""
          initial={{ opacity: 0, scale: 1.25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: easeOut }}
        />
      </m.div>

      <m.div className={s.glowCorner} style={glowDepth} aria-hidden>
        <m.img
          src={glowCorner}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0.7, 1], scale: [1, 1.1, 1], x: [0, 18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </m.div>

      <m.div className={s.glowCenter} style={glowDepth} aria-hidden>
        <m.img
          src={glowCenter}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0.8, 1], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
      </m.div>

      <div className={s.sparks} aria-hidden>
        {SPARKS.map(([left, top, size, delay, duration], i) => (
          <span
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        ))}
      </div>

      {/* Красный стикер в макете лежит под преподавателем */}
      <m.div className={s.stickerLeft} style={leftCardDepth}>
        <m.div
          initial={{ opacity: 0, x: -140, rotate: -35, scale: 0.6 }}
          animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.95 }}
        >
          <m.div {...float(4, 4.2, 2)}>
            <div className={`${s.sticker} ${s.stickerRed}`}>
              <p>ҰБТ-ға дайындықты неден бастарыңды білмейсің бе?</p>
            </div>
          </m.div>
        </m.div>
      </m.div>

      <m.h1 id="hero-title" className={s.title} style={{ ...titleDepth, opacity: titleFade }}>
        <m.img
          src={title}
          alt="2 күндік марафон"
          initial={{ opacity: 0, y: 36, scale: 0.86, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.25 }}
        />
      </m.h1>

      <m.p
        className={s.subtitle}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: easeOut, delay: 0.55 }}
      >
        2027 ҰБТ-да МАТЕМАТИКА таңдап, <b>ГРАНТҚА түскісі келетіндерге</b>
      </m.p>

      <m.div className={s.teacher} style={teacherDepth}>
        <m.img
          src={teacher}
          alt="Рамазан ағай"
          initial={{ opacity: 0, y: 110, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: easeOut, delay: 0.4 }}
        />
      </m.div>

      <m.div
        className={s.panel}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 1 }}
      >
        <m.p
          className={s.panelText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 1.3 }}
        >
          Онда РАМАЗАН ағай
          <br />
          курсында 2&nbsp;күн ТЕГІН ОҚЫ!
        </m.p>
        <CtaButton
          className={s.cta}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 1.45 }}
        />
      </m.div>

      <m.div
        className={s.badge}
        initial={{ opacity: 0, y: -60, rotate: -25, scale: 1.4 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <div className={s.badgeBody}>
          <span>ПРОГРЕССИЯДАН</span>
        </div>
      </m.div>

      <m.div className={s.stickerRight} style={rightCardDepth}>
        <m.div
          initial={{ opacity: 0, x: 140, rotate: 40, scale: 0.6 }}
          animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          transition={{ ...spring, delay: 1.1 }}
        >
          <m.div {...float(5, 5.1, 2.3)}>
            <div className={`${s.sticker} ${s.stickerDark}`}>
              <p>Прогрессия оңай тілмен</p>
            </div>
          </m.div>
        </m.div>
      </m.div>
    </section>
  )
}
