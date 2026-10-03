import { useRef, type CSSProperties } from 'react'
import { m, useScroll, useTransform, type Variants } from 'motion/react'
import swirl from '../../assets/swirl.svg'
import titleExpect from '../../assets/title-expect.svg'
import titleScript from '../../assets/title-expect-script.svg'
import { CtaButton } from '../CtaButton/CtaButton'
import { easeOut, inView, spring } from '../../motion/presets'
import s from './Program.module.scss'

type Day = {
  date: string
  title: string
  items: string[]
  from: 'left' | 'right'
  // Геометрия карточки из макета: ширина текстового блока, высота, верхний отступ.
  textWidth: number
  minHeight: number
  padTop: number
}

const DAYS: Day[] = [
  {
    date: '05.10',
    title: '1-КҮН: Рамазан ағаймен тікелей эфир: ЭФИРДЕ',
    items: [
      'Арифметикалық прогрессия тарауына практикалық сабақ',
      'Нағыз ҰБТ 2026 келген арифметикалық прогрессия есептері',
      'Эфирде оқушыларға ақшалай сыйлықтар',
    ],
    from: 'left',
    textWidth: 229,
    minHeight: 163,
    padTop: 14,
  },
  {
    date: '06.10',
    title: '2-КҮН: Рамазан ағаймен Практикалық сабақ',
    items: [
      'Геометриялық прогрессия тарауына практикалық сабақ',
      'Есептерді тез шығарудың авторлық лайфхактары',
      'Үздік оқушыларға ақшалай сыйлықтар',
      'Нағыз ҰБТ 2026 келген геометрия прогрессия есептері',
    ],
    from: 'right',
    textWidth: 235,
    minHeight: 179,
    padTop: 15,
  },
]

const cardVariants = (from: Day['from']): Variants => ({
  hidden: { opacity: 0, x: from === 'left' ? -160 : 160, rotate: from === 'left' ? -6 : 6 },
  shown: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { ...spring, delayChildren: 0.3, staggerChildren: 0.09 },
  },
})

const lineVariants = (from: Day['from']): Variants => ({
  hidden: { opacity: 0, x: from === 'left' ? 28 : -28 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
})

const dateVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -120 },
  shown: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 14, delay: 0.45 } },
}

function DayCard({ day }: { day: Day }) {
  const line = lineVariants(day.from)
  return (
    <m.li className={s.day} initial="hidden" whileInView="shown" viewport={inView}>
      <m.article
        className={s.card}
        variants={cardVariants(day.from)}
        style={{ '--min-h': day.minHeight, '--pad-top': day.padTop, '--text-w': day.textWidth } as CSSProperties}
      >
        <m.h3 className={s.dayTitle} variants={line}>
          {day.title}
        </m.h3>
        <ul className={s.items}>
          {day.items.map((item) => (
            <m.li key={item} variants={line}>
              {item}
            </m.li>
          ))}
        </ul>
      </m.article>
      <m.time className={s.date} variants={dateVariants}>
        {day.date}
      </m.time>
    </m.li>
  )
}

export function Program() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const swirlRotate = useTransform(scrollYProgress, [0, 1], [-10, 10])
  const swirlY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section ref={ref} className={s.program} aria-labelledby="program-title">
      <m.div className={s.swirl} style={{ rotate: swirlRotate, y: swirlY }} aria-hidden>
        <div className={s.swirlShape}>
          <img src={swirl} alt="" />
        </div>
      </m.div>

      <m.header className={s.heading} initial="hidden" whileInView="shown" viewport={inView}>
        <h2 id="program-title" className="visually-hidden">
          Марафонда сені не күтеді
        </h2>
        <m.img
          className={s.title}
          src={titleExpect}
          alt=""
          variants={{
            hidden: { opacity: 0, x: -70, filter: 'blur(10px)' },
            shown: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1, ease: easeOut } },
          }}
        />
        {/* «Рукописная» надпись проявляется слева направо, как будто её пишут */}
        <m.img
          className={s.script}
          src={titleScript}
          alt=""
          variants={{
            hidden: { opacity: 0, clipPath: 'inset(-20% 100% -20% 0%)', rotate: -4 },
            shown: {
              opacity: 1,
              clipPath: 'inset(-20% -5% -20% 0%)',
              rotate: 0,
              transition: { duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.45 },
            },
          }}
        />
      </m.header>

      <ol className={s.days}>
        {DAYS.map((day) => (
          <DayCard key={day.date} day={day} />
        ))}
      </ol>

      <m.div
        className={s.ctaRow}
        initial={{ opacity: 0, y: 60, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={inView}
        transition={spring}
      >
        <CtaButton />
      </m.div>
    </section>
  )
}
