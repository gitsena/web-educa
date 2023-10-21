import { ReactNode } from 'react'
import style from './cardTopic.module.scss'
import { format } from 'date-fns';

type Props = {
  title: string
  description: string
  answers: number
  date: string
  children?: ReactNode
  onClick?: () => void
  name?: string
  lastName?: string
}

export const CardTopic = ({
  title,
  description,
  answers,
  date,
  children,
  onClick,
  name,
  lastName
}: Props) => {

  const formattedDate = format(new Date(date), 'dd/MM/yyyy');
  const truncatedDescription = description.length > 100 ? `${description.slice(0, 100)}...` : description;

  return (
    <>
      <div className={style.container} onClick={onClick}>
        <div className={answers > 0 ? `${style.card}` : `${style.unasweredCard}`}>
          <div className={style.info}>
            <h2>{title}</h2>
            <p>{truncatedDescription}</p>
            <span>{`${`${answers} respostas`
              }`}</span>
          </div>
          <div className={style.date}>
            <p>Postada em {formattedDate} por {name} {lastName}</p>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
