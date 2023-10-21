import style from './deleteContent.module.scss'
import { Button } from '../../../components/Button'
import PostService from '../../../services/post.service'

type Props = {
  onClose: () => void
  contentId?: number
}

export const DeleteContent = ({ onClose, contentId }: Props) => {
    console.log(contentId)

  const deleteContent = () => {
    PostService.deleteContent(contentId).then(
      (response: any) => {
        console.log(response.data)
        onClose()
      },
      (error: any) => {
        console.log('DELETE/TEACHER/deleteContent: Erro', error.response)
        // Invalid token
        if (error.response && error.response.status === 403) {
          console.log('DELETE/TEACHER/deleteContent: Erro de autenticação')
          // AuthService.logout();
          // navigate("/login");
          // window.location.reload();
        }
      }
    )
  }

  return (
    <div className={style.box}>
      <h1>Tem certeza que deseja deletar este conteúdo?</h1>
      <div>
        <Button className={style.btn} title="Não" onClick={onClose} />
        <Button
          className={style.btnDelete}
          title="Sim, deletar"
          onClick={deleteContent}
        />
      </div>
    </div>
  )
}
