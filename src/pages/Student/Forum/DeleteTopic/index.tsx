import style from './deleteTopic.module.scss';
import { Button } from '../../../../components/Button';
import PostService from '../../../../services/post.service'
type Props = {
  isAnswer?: boolean
  onClose: () => void;
  selectedTopic?: any
  selectedAnswer?: any

};

export const DeleteTopic = ({ onClose, selectedTopic, isAnswer, selectedAnswer }: Props) => {
  console.log(selectedTopic)

  const deleteTopic = () => {
    PostService.deleteTopic(selectedTopic.idTopico).then(
      (response: any) => {
        console.log(response.data)
        onClose()
      },
      (error: any) => {
        console.log('DELETE/STUDENT/deleteTopic: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('DELETE/STUDENT/deleteTopic: Erro de autenticação')
        }
      }
    )
  }

  const deleteAnswer = () => {
    PostService.deleteAnswer(selectedAnswer.idResposta).then(
      (response: any) => {
        console.log(response.data)
        onClose()
      },
      (error: any) => {
        console.log('DELETE/STUDENT/deleteAnswer: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('DELETE/STUDENT/deleteAnswer: Erro de autenticação')
        }
      }
    )
  }

  return (
    <div className={style.box}>
      {!isAnswer ? (
        <>
          <h1>Tem certeza que deseja deletar esse tópico?</h1>
          <p>Todas as respostas também serão deletadas.</p>
        </>
      ) : (
        <>
          <h1>Tem certeza que deseja deletar este comentario?</h1>
          <p>somente sua resposta será deletada.</p>
        </>
      )}

      <div>
        <Button className={style.btn} title="Não" onClick={onClose} />
        <Button
          className={style.btnDelete}
          title="Sim, deletar"
          onClick={!isAnswer ? deleteTopic : deleteAnswer}
        />
      </div>
    </div>
  );
};
