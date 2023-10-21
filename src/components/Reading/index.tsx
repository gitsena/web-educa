import { CardLikert } from '../CardLikert'
import style from './reading.module.scss'

type Props = {
  isTeacher?: boolean
  title: string
  text: string
  contentId: number
}

export const Reading = ({ title, text, contentId, isTeacher }: Props) => {
  return (
    <aside className={style.container}>
      <h1>{title}</h1>
      <p>{text}</p>

      {!isTeacher && <CardLikert contentId={contentId} />}
    </aside>
  )
}
