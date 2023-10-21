import style from './updateAnswer.module.scss'
import { Button } from '../../../../components/Button'
import { useState } from 'react'
import PostService from '../../../../services/post.service'

type Props = {
  onClose: () => void
  selectedAnswer: any
}

export const UpdateAnswer = ({ onClose, selectedAnswer }: Props) => {
  const [updatedAnswer, setUpdatedAnswer] = useState<string>(selectedAnswer.resposta)

  console.log(selectedAnswer.resposta)

  const data = {
    idTopico: selectedAnswer.idResposta,
    resposta: updatedAnswer
  }

  const updateAnswer = () => {
    PostService.updateAnswer(selectedAnswer.idResposta, data).then(
      (response: any) => {
        console.log(response.data)
        onClose()
      },
      (error: any) => {
        console.log('STUDENT/FORUM/UpdateTopic: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('STUDENT/FORUM/UpdateTopic: Erro de autenticação')
        }
      }
    )
  }

  return (
    <div className={style.box}>
      <textarea
        placeholder="Corpo da resposta"
        value={updatedAnswer}
        onChange={(e: any) => setUpdatedAnswer(e.target.value)}
      />
      <div className={style.cBtn}>
        <Button className={style.btnBack} title="Voltar" onClick={onClose} />
        <Button
          className={style.btnRegister}
          title="Atualizar resposta"
          onClick={updateAnswer}
        />
      </div>
    </div>
  )
}
