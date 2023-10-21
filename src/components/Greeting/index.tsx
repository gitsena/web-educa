import style from './greeting.module.scss'

type Props = {
  name: string
  text: string
  img: string
}

export const Greeting = ({ name, text, img }: Props) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.text}>
          <p className={style.title}>
            <span>Olá, </span>
            {name}
          </p>
          <div className={style.subtitle}>
            <p>{text}</p>
          </div>
        </div>
          <div className={style.imageGreeting}>
            <img src={img} alt=""/>
          </div>
      </div>
    </>
  )
}
