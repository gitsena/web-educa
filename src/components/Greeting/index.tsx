import style from './greeting.module.scss'
import { FormContext } from '../../utils/contexts/FormContext'; 
import { useContext } from "react";

type Props = {
  name: string
  text: string
  img: string
}

export const Greeting = ({ name, text, img }: Props) => {
  const contextValue = useContext(FormContext);
  if (!contextValue) {
    throw new Error('useForm prescisa ser usado dentro do FormProvider');
  }

  const { state } = contextValue;
  return (
    <>
      <div className={style.container}>
        <div className={style.text}>
          <p className={style.title}>
            <span>Olá, </span>
            {state.name}
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
