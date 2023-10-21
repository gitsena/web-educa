import { ReactNode } from 'react'
import style from './contentCard.module.scss'
import { format } from 'date-fns';

type Props = {
  contentId: number
  title: string
  hability: string
  date: string
  img?: string
  children?: ReactNode
  onClick?: () => void

}

export const ContentCard = ({
  title,
  hability,
  date,
  img,
  children,
  contentId,
  onClick
}: Props) => {

  const formattedDate = format(new Date(date), 'dd/MM/yyyy');

  return (
    <div className={style.card} key={contentId}>
      <div className={style.circle} onClick={onClick}>
        <img src={img} alt="" />
      </div>
      <div className={style.content}>
        <div className={style.text} onClick={onClick}>
          <h2>{title}</h2>
          <span className={style.highlight}>{hability}</span>
        </div>
        <div className={style.date}>
          <p>Postada em {formattedDate}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
