import style from './selectedTopics.module.scss'
import { Button } from '../../../../components/Button'
import { useState } from 'react'
import PostService from '../../../../services/post.service'
import iconEdit from '../../../../assets/img/edit.svg'
import iconDelete from '../../../../assets/img/delet.svg'
import { Modal } from '../../../../components/Modal'
import { UpdateAnswer } from '../UpdateAnswer'
import { format } from 'date-fns';
import { DeleteTopic } from '../DeleteTopic'

type Props = {
  onClose: () => void
  selectedTopic: any
  student?: any
}

export const SelectedTopic = ({ onClose, selectedTopic, student }: Props) => {
  const [answers] = useState(selectedTopic.respostas)
  const [newAnswer, setNewAnswer] = useState<string>('')
  const [addNewAnswer, setAddNewAnswer] = useState<boolean>(false)
  const [invalid, setInvalid] = useState<boolean>(false)
  const [currentAnswer, setCurrentAnswer] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showSelectTopicLayout, setShowSelectTopicLayout] = useState(true);

  const data = {
    idTopico: selectedTopic.idTopico,
    resposta: newAnswer
  }

  const saveAnswer = () => {
    if (data.resposta !== '') {
      PostService.registerAnswer(data).then(
        (response: any) => {
          console.log(response.data)
          onClose()
          setAddNewAnswer(false)
        },
        (error: any) => {
          console.log(
            'FORUM/ESTUDANTE/SELECTEDTOPIC/registerAnswer: Erro',
            error.response
          )
          if (error.response && error.response.status === 403) {
            console.log(
              'FORUM/ESTUDANTE/SELECTEDTOPIC/registerAnswer: Erro de autenticação'
            )
          }
        }
      )
    }
    setInvalid(true)
  }

  const handleUpdateAnswer = (answer: any) => {
    setModalType("edit");
    setCurrentAnswer(answer)
    setIsModalVisible(true);
    setShowSelectTopicLayout(false);
    console.log(answer);

  }

  const handleDeleteAnswer = (answer: any) => {
    setModalType("delete");
    setCurrentAnswer(answer)
    setIsModalVisible(true);
    setShowSelectTopicLayout(false);

  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setShowSelectTopicLayout(true);
  }



  const formattedDateQuestion = format(new Date(selectedTopic.dataCriacao), 'dd/MM/yyyy');

  return (
    <>
      <div className={style.box}>
        {showSelectTopicLayout && (
          <div className={style.row}>
            <div className={style.card}>
              <div>
                <h1>{selectedTopic.titulo}</h1>
                <p>{selectedTopic.descricao}</p>
              </div>
              <div className={style.cInfo}>
                <h6>
                  Postada em {formattedDateQuestion} por {selectedTopic.nome}
                  {selectedTopic.sobrenome}
                </h6>
                <button
                  className={style.btnAdd}
                  onClick={() => setAddNewAnswer(true)}
                >
                  Adicionar resposta
                </button>
              </div>
            </div>
          </div>
        )}
        {showSelectTopicLayout && (
          <><div className={style.col}>
            {answers.map((answer: any, index: number) => (
              <div key={answer.idTopico} className={style.sAnswer}>
                <div className={style.info}>
                  <p>{answer.resposta}</p>
                </div>
                <div className={style.date}>
                  <div>
                    Respondido em <span> {new Date(answer.dataCriacao).toLocaleDateString('pt-BR')} </span> por
                    <span>
                      {" "}{answer.usuario.nome} {answer.usuario.sobrenome}
                    </span>
                  </div>
                  {student.name == selectedTopic.respostas[index].usuario.nome && (
                    <div >
                      <img
                        src={iconEdit}
                        onClick={() => handleUpdateAnswer(answer)}
                        role="button"
                        aria-label="editar tópico"
                      />
                      <img
                        src={iconDelete}
                        onClick={() => handleDeleteAnswer(answer)}
                        role="button"
                        aria-label="deletar tópico"
                      />
                    </div>

                  )}
                </div>
              </div>
            ))}

            {addNewAnswer && (
              <div className={style.saveAnswer}>
                <textarea
                  placeholder="Corpo da resposta"
                  value={newAnswer}
                  onChange={(e: any) => setNewAnswer(e.target.value)}
                  onBlur={() => {
                    if (newAnswer == '') {
                      setInvalid(true)
                    }
                  }}
                />
                <Button
                  className={style.save}
                  title="Salvar resposta"
                  onClick={saveAnswer}
                />

                <div className={style.error}>
                  {invalid && <p>Resposta não pode ser vazia.</p>}
                </div>

              </div>
            )}
          </div>
            <div className={style.footer}>
              <div>
                <Button className={style.btn} title="Fechar" onClick={onClose} />
              </div>
            </div></>

        )}
        {isModalVisible && (
          <Modal
            isBottomless
            isOpen={isModalVisible}
            onClose={handleCloseModal}
          >
            {modalType === "edit" && (
              <UpdateAnswer
                selectedAnswer={currentAnswer}
                onClose={handleCloseModal}
              />
            )}
            {modalType === "delete" && (
              <DeleteTopic
                isAnswer
                selectedAnswer={currentAnswer}
                onClose={handleCloseModal}
              />
            )}
          </Modal>
        )}
      </div>
    </>
  )
}
