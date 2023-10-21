import { Video } from './Video'
import style from './videoClass.module.scss'
import imgPlay from '../../assets/img/PlayVideo.svg'
import { CardLikert } from '../CardLikert'

type Props = {
  isTeacher?: boolean
  title: string
  name: string
  lastName: string
  category: string
  video: string
  contentId: number
}

export const VideoClass = ({
  isTeacher,
  title,
  name,
  category,
  video,
  lastName,
  contentId
}: Props) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.innerContainer}>
          <Video video={video} />
          <div className={isTeacher ? `${style.teacherInfo}` : style.info}>
            <div className={style.containerTitle}>
              <div className={style.title}>
                <img src={imgPlay} alt=" image Play video" />
                <h1>{title}</h1>
              </div>
              <p>
                Postado por{' '}
                <span>
                  Professor {name} {lastName}
                </span>
              </p>
              <div className={style.category}>{category}</div>
            </div>
            {!isTeacher && <CardLikert contentId={contentId} />}
          </div>
        </div>
      </div>
    </>
  )
}
