import style from './video.module.scss'

type Props = {
  video: string
}

export const Video = ({ video }: Props) => {
  return (
    <div className={style.container}>
      <iframe
        src={video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
