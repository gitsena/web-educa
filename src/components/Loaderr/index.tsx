import style from './loaderr.module.scss'
//import img from '../../assets/img/loader.svg'

export default function loaderr(){
    return(
        <div className={style.loader_container}>
      <div className={style.loader}></div>
    </div>
    )
}