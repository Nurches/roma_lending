import { m, type HTMLMotionProps } from 'motion/react'
import ctaBg from '../../assets/cta.svg'
import { REGISTER_URL } from '../../config'
import s from './CtaButton.module.scss'

type Props = Omit<HTMLMotionProps<'a'>, 'href' | 'children'>

export function CtaButton({ className, ...rest }: Props) {
  return (
    <m.a
      href={REGISTER_URL}
      className={[s.cta, className].filter(Boolean).join(' ')}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      {...rest}
    >
      <span className={s.glow} aria-hidden />
      <img className={s.bg} src={ctaBg} alt="" draggable={false} />
      <span className={s.shine} aria-hidden />
      <span className={s.label}>Тіркелемін</span>
    </m.a>
  )
}
