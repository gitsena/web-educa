import style from './card.module.scss'

type Props = {
  className?: string
  img: string
  h4?: string
  text: string
  value?: number
  onClick?: any
}

export const Card = ({ className, img, h4, text, value, onClick }: Props) => {
  return (
    <div className={`${style.card} ${className}`} onClick={onClick}>
      <img src={img} onClick={onClick} />
      <div className={style.text}>
        <span className={style.highlight}>{h4}</span>
        <span className={style.highlight}>{value}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}
