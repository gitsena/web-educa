import { Greeting } from '../../../components/Greeting'
import img from '../../../assets/img/greetingTeacher.svg'
import { ContentCard } from '../../../components/ContentCard'
import Overview from '../Overview'
import { Modal } from '../../../components/Modal'
import iconEdit from '../../../assets/img/edit.svg'
import iconDelete from '../../../assets/img/delet.svg'
import { useEffect, useState } from 'react'
import PostService from '../../../services/post.service'
import style from './home.module.scss'
import { DeleteContent } from '../DeleteContent'
import { UpdateContent } from '../UpdateContent'
import iconEmpty from '../../../assets/img/empty.svg'
import { Button } from '../../../components/Button'
import { Reading } from '../../../components/Reading'
import { VideoClass } from '../../../components/VideoClass'
import iconDocument from '../../../assets/img/documents.png'

export const Home = () => {
  const [currentId, setCurrentId] = useState()
  const [isContentClicked, setIsContentClicked] = useState<boolean>(false)
  const [contentClicked, setContentClicked] = useState<any>({})
  const [isVideo, setIsVideo] = useState<boolean>(false)
  const [isUserContentEmpty, setIsUserContentEmpty] = useState<boolean>(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [teacherContent, setTeacherContent] = useState<any[]>([])
  const [ratings, setRatings] = useState<number>(0)
  const [teacher, setTeacher] = useState({
    name: '',
    lastName: '',
    careerTime: '',
    occupation: ''
  })

  useEffect(() => {
    PostService.getUserRatings().then(
      (response: any) => {
        console.log('RESPONSE USER RATINGS', response)
        setRatings(response.data.avaliacao)
      },
      (error: any) => {
        console.log('HOME/Professor/getUserRating: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('HOME/Professor/getUserRating: Erro de autenticação')
        }
      }
    )
  }, [])

  useEffect(() => {
    PostService.getUser().then(
      (response: any) => {
        setTeacher({
          name: response.data.nome,
          lastName: response.data.sobrenome,
          careerTime: response.data.inicioAtuacao,
          occupation: response.data.areaAtuacao
        })
      },
      (error: any) => {
        console.log('HOME/Professor/getUser: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('HOME/Professor/getUser: Erro de autenticação')
        }
      }
    )
  }, [])

  useEffect(() => {
    PostService.getUserContent().then(
      (response: any) => {
        if (response.status == 204) {
          setIsUserContentEmpty(true)
          return
        }

        setTeacherContent(response.data.content)
      },
      (error: any) => {
        console.log('HOME/Professor/getUserContent: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('HOME/Professor/getUserContent: Erro de autenticação')
        }
      }
    )
    console.log('disparou o TEACHER CONTENT')
  }, [teacherContent])

  function handleContentClick(post: any) {
    console.log(post)
    setContentClicked({
      titulo: post.titulo,
      video: post.urlVideo,
      nome: post.usuario.nome,
      sobrenome: post.usuario.sobrenome,
      categoria: post.habilidade.codigo,
      texto: post.texto
    })

    if (
      post.urlVideo !== 'https://www.youtube.com/embed/undefined' &&
      post.urlVideo !== null &&
      post.urlVideo !== 'https://www.youtube.com/embed/'
    ) {
      setIsVideo(true)
    }
    console.log(isVideo)
    setIsContentClicked(true)
  }

  const handleEditClick = (id: any) => {
    setIsEditModalVisible(true)
    setCurrentId(id)
  }

  const handleDeleteClick = (id: any) => {
    setIsDeleteModalVisible(true)
    setCurrentId(id)
  }

  return (
    <div className={style.container}>
      {isContentClicked ? (
        <>
          {isVideo ? (
            <VideoClass
              isTeacher
              contentId={contentClicked.id}
              name={contentClicked.nome}
              lastName={contentClicked.sobrenome}
              category={contentClicked.categoria}
              video={contentClicked.video}
              title={contentClicked.titulo}
            />
          ) : (
            <Reading
              isTeacher
              contentId={contentClicked.id}
              title={contentClicked.titulo}
              text={contentClicked.texto}
            />
          )}
          <div className={style.cBtn}>
            <Button
              className={style.btn}
              title="<< Voltar"
              onClick={() => {
                setIsContentClicked(false)
                setIsVideo(false)
              }}
            />
          </div>
        </>
      ) : (
        <div className={style.innerContainer}>
          <Greeting
            name={teacher.name}
            img={img}
            text={'Pronto para começar uma nova aula?'}
          />
          <Overview conteudos={teacherContent.length} avaliacoes={ratings} />
          <div className={style.text}>
            <h2>Meus conteúdos</h2>
            <span>Ver todos</span>
          </div>
          <div className={style.cards}>
            {isUserContentEmpty ? (
              <div className={style.empty}>
                <h3>Ops! Parece que ainda não há nada para ver por aqui.</h3>
                <img src={iconEmpty} alt="" />
              </div>
            ) : (
              teacherContent?.map((post: any) => (
                <ContentCard
                  img={iconDocument}
                  key={post.idConteudo}
                  contentId={post.idConteudo}
                  title={post.titulo}
                  hability={post.habilidade.codigo}
                  date={post.dataCriacao}
                  onClick={() => handleContentClick(post)}
                >
                  <div className={style.col}>
                    <img
                      aria-label="atualizar conteúdo"
                      role="button"
                      src={iconEdit}
                      onClick={() => handleEditClick(post.idConteudo)}
                    />
                    <img
                      aria-label="deletar conteúdo"
                      role="button"
                      src={iconDelete}
                      onClick={() => handleDeleteClick(post.idConteudo)}
                    />
                  </div>
                </ContentCard>
              ))
            )}
          </div>
        </div>
      )}
      {isDeleteModalVisible && (
        <Modal
          isOpen={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
        >
          <DeleteContent
            contentId={currentId}
            onClose={() => setIsDeleteModalVisible(false)}
          />
        </Modal>
      )}
      {isEditModalVisible && (
        <Modal
          isOpen={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
        >
          <UpdateContent
            contentId={currentId}
            onClose={() => setIsEditModalVisible(false)}
          />
        </Modal>
      )}
    </div>
  )
}
