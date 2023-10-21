import style from './registerQuestion.module.scss'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { useState, useEffect } from 'react'
import PostService from '../../../../services/post.service'
import { Modal } from '../../../../components/Modal'
import { UpdateSuccess } from '../../../Teacher/UpdateContent/UpdateSuccess'

type Props = {
  onClose: () => void
}

export const RegisterTopic = ({ onClose }: Props) => {
  const [subject, setSubject] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  const [characterCount, setCharacterCount] = useState<number>(0)
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  const data = {
    titulo: subject,
    descricao: description
  }

  const registerQuestion = () => {
    if (data.titulo != '' && data.descricao != '') {
      PostService.registerTopic(data).then(
        (response: any) => {
          console.log(response.data)
          setShowUpdateSuccess(true)
        },
        (error: any) => {
          console.log('STUDENT/FORUM/RegisterTopic: Erro', error.response)
          if (error.response && error.response.status === 403) {
            console.log('STUDENT/FORUM/RegisterTopic: Erro de autenticação')
          }
        }
      )
    } else {
      setErrorMessage(true)
    }
  }

  useEffect(() => {
    if (showUpdateSuccess) {
      const timer = setTimeout(() => {
        setShowUpdateSuccess(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
        onClose();

      };
    }
  }, [showUpdateSuccess]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDescription(value);
      setCharacterCount(value.length);
    }
  };

  useEffect(() => {
    setCharacterCount(description.length);
  }, [description]);
  return (
    <>
      <div className={style.box}>
        <Input
          text="Assunto do tópico:"
          type="text"
          placeholder="exemplo"
          value={subject}
          onChange={(e: any) => setSubject(e.target.value)}
        />
        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
        />
        <p>Caracteres restantes: {200 - characterCount} </p>
        <div className={style.error}>
          {errorMessage && <p>Assunto e/ou descrição não podem ser vazios.</p>}
        </div>
        <div className={style.cBtn}>
          <Button className={style.btnBack} title="Voltar" onClick={onClose} />
          <Button
            className={style.btnRegister}
            title="Cadastrar"
            onClick={registerQuestion}
          />
        </div>
      </div>

      {showUpdateSuccess && (
        <Modal
          isBottomless
          isOpen={showUpdateSuccess}
          onClose={() => {
            setShowUpdateSuccess(false);
            onClose();
          }}
        >
          <UpdateSuccess onClose={() => {
            setShowUpdateSuccess(false);
            onClose();
          }} />
        </Modal>
      )}
    </>
  )
}
