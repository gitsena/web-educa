import style from './forum.module.scss'
import { useEffect, useState } from 'react'
import { Modal } from '../../../components/Modal'
import { CardTopic } from './CardTopic'
import { SelectedTopic } from './SelectedTopic'
import { Greeting } from '../../../components/Greeting'
import { RegisterTopic } from './RegisterTopic'
import { UpdateTopic } from './UpdateTopic'
import { DeleteTopic } from './DeleteTopic'
import { Card } from '../../Teacher/Overview/Card'
import img from '../../../assets/img/greetingTeacher.svg'
import iconEdit from '../../../assets/img/edit.svg'
import iconDelete from '../../../assets/img/delet.svg'
import iconVisible from '../../../assets/img/visible.svg'
import iconAdd from '../../../assets/img/addSmall.svg'
import PostService from '../../../services/post.service'
import iconEmpty from '../../../assets/img/empty.svg'

export const Forum = () => {
  const [isAnswerModalVisible, setAnswerIsModalVisible] = useState(false)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTopic, setCurrentTopic] = useState()
  const [modalType, setModalType] = useState("");

  const handleEditClick = (topic: any) => {
    console.log(topic);
    setModalType("edit");
    setCurrentTopic(topic);
    setIsModalVisible(true);
  };

  const handleDeleteClick = (topic: any) => {
    setModalType("delete");
    setCurrentTopic(topic);
    setIsModalVisible(true);
  };

  const [topics, setTopics] = useState<any[]>([])
  const [isTopicsEmpty, setIsTopicEmpty] = useState<boolean>(false)

  const [student, setStudent] = useState({
    name: '',
    lastName: ''
  })

  useEffect(() => {
    PostService.getUser().then(
      (response: any) => {
        setStudent({
          name: response.data.nome,
          lastName: response.data.sobrenome
        })
      },
      (error: any) => {
        console.log('FORUM/ESTUDANTE/getUser: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('FORUM/ESTUDANTE/getUser: Erro de autenticação')
        }
      }
    )
  }, [])

  useEffect(() => {
    PostService.getTopic().then(
      (response: any) => {
        if (response.status == 204) {
          setIsTopicEmpty(true)
          return
        }

        setTopics(response.data.content)
      },
      (error: any) => {
        console.log('FORUM/ESTUDANTE/getTopic: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('FORUM/ESTUDANTE/getTopic: Erro de autenticação')
        }
      }
    )
  }, [topics])

  const handleTopicClicked = (topic: any) => {
    console.log(topic)
    setCurrentTopic(topic)
    setAnswerIsModalVisible(true)
  }

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <Greeting
          name={student.name}
          img={img}
          text={
            'Com dúvidas? Utilize o fórum para se comunicar com outros estudantes'
          }
        />
        <div className={style.cOverviem}>
          <Card
            className={style.cardVisible}
            img={iconVisible}
            text={'Ver todos os tópicos'}
          />
          <Card
            className={style.cardAdd}
            img={iconAdd}
            text="Adicionar novo tópico"
            onClick={() => setIsAddModalVisible(true)}
          />
        </div>
        <div className={style.cards}>
          {isTopicsEmpty ? (
            <div className={style.empty}>
              <h3>Ops! Parece que ainda não há nada para ver por aqui.</h3>
              <img src={iconEmpty} alt="" />
            </div>
          ) : (
            topics?.map((topic: any) => (
              <CardTopic
                onClick={() => handleTopicClicked(topic)}
                key={topic.idTopico}
                title={topic.titulo}
                description={topic.descricao}
                date={topic.dataCriacao}
                answers={topic.respostas.length}
                name={topic.usuario.nome}
                lastName={topic.usuario.sobrenome}
              >
                <div className={style.col}>
                  <img
                    src={iconEdit}
                    onClick={() => handleEditClick(topic)}
                    role="button"
                    aria-label="editar tópico"
                  />
                  <img
                    src={iconDelete}
                    onClick={() => handleDeleteClick(topic)}
                    role="button"
                    aria-label="deletar tópico"
                  />
                </div>
              </CardTopic>
            ))
          )}

          {isAnswerModalVisible && !isModalVisible && (
            <Modal
              isOpen={isAnswerModalVisible}
              onClose={() => setAnswerIsModalVisible(false)}
            >
              <SelectedTopic
                student={student}
                selectedTopic={currentTopic}
                onClose={() => setAnswerIsModalVisible(false)}
              />
            </Modal>
          )}


          {isAddModalVisible && (
            <Modal
              isOpen={isAddModalVisible}
              onClose={() => setIsAddModalVisible(false)}
            >
              <RegisterTopic onClose={() => setIsAddModalVisible(false)} />
            </Modal>

          )}

          {isModalVisible && (
            <Modal
              isOpen={isModalVisible}
              onClose={() => {
                setIsModalVisible(false);
                setAnswerIsModalVisible(false);
              }}
            >
              {modalType === "edit" && (
                <UpdateTopic
                  selectedTopic={currentTopic}
                  onClose={() => {
                    setIsModalVisible(false);
                    setAnswerIsModalVisible(false);
                  }}
                />
              )}
              {modalType === "delete" && (
                <DeleteTopic
                  selectedTopic={currentTopic}
                  onClose={() => {
                    setIsModalVisible(false);
                    setAnswerIsModalVisible(false);
                  }} />
              )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}
