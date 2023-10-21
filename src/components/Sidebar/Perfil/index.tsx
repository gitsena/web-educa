import style from './perfil.module.scss'

type Props = {
  photo: any
  name: string
  userType: string
  careerTime?: string
  occupation?: string
  labOne?: String
  labtwo?: String
}

export const Perfil = ({
  photo,
  name,
  userType,
  careerTime,
  occupation,
  labOne,
  labtwo
}: Props) => {
  return (
    <>
      <div className={style.card}>
        <img src={photo} />
        <h3>{name}</h3>
        <h4>{userType}</h4>
        <span className={style.info}>
          <p>{labOne}</p>
          {careerTime}
          <p>{labtwo}</p>
          {occupation}
        </span>
      </div>
    </>
  )
}
