import style from './loader.module.scss'
import img from '../../assets/img/loader.svg'

export const Loader = () => {
  return (
      <div className={style.loader}>
        <img src={img} alt="Carregando página..."/>
      </div>
  )
}
