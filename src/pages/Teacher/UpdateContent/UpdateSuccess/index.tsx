import style from './updateSuccess.module.scss'
import image from '../../../../assets/img/update.svg'
import { Button } from '../../../../components/Button'
type Props = {
  isUpdate?: boolean
  onClose?: () => void
}

export const UpdateSuccess = ({ onClose, isUpdate }: Props) => {
  return (
    <div className={style.box}>
      {isUpdate ? (
        <>
          <h1>Conteúdo atualizado!</h1>
        </>
      ) : (
        <>
          <h1>Conteúdo cadastrado!</h1>
        </>
      )}
      <div>
        <img className={style.image} src={image} alt="update success" />
      </div>
      <Button className={style.btn} title="Fechar" onClick={onClose} />
    </div>
  )
}
