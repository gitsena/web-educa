import { Sidebar } from '../../components/Sidebar'
// import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
// import AuthService from '../../services/auth.service'
import PostService from '../../services/post.service'
import style from './teacher.module.scss'
import { Home } from './Home'
import { Content } from './Content'
import { FormContext } from '../../utils/contexts/FormContext'; 

export const Teacher = () => {
  const contextValue = useContext(FormContext);
  if (!contextValue) {
    throw new Error('useForm prescisa ser usado dentro do FormProvider');
  }

  const { state } = contextValue;

  const [chosenComponent, setChosenComponent] = useState(<Home />)
  const [chosenItem, setChosenItem] = useState()
  // const navigate = useNavigate()

  /*const [teacher, setTeacher] = useState({
    name: '',
    lastName: '',
    careerTime: '',
    occupation: ''
  })

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
        console.log('PROFESSOR/getUser: Erro ', error.response)
        // Invalid token
        if (error.response && error.response.status === 403) {
          console.log('PROFESSOR/getUser: Erro de autenticação')
          // AuthService.logout();
          // navigate("/login");
          // window.location.reload();
        }
      }
    )
  }, [])
  */

  const handleChosenItem = (chosen: any) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const chosenItem = chosen.target.innerText
    setChosenItem(chosenItem)
    switch (chosenItem) {
      case 'Meus conteúdos':
        setChosenComponent(<Home />)
        break
      case 'Ver todos':
        setChosenComponent(<Content />)
        break
      default:
        setChosenComponent(<Home />)
    }
  }

  return (
    <div className={style.container}>
      <Sidebar
        isTeacher
        name={state.name}
        lastName={state.lastName}
        occupation={state.occupation}
        careerTime={state.careerTime}
        handleChosenItem={handleChosenItem}
        selectedItem={chosenItem}
      />
      <div className={style.innerContainer}>{chosenComponent}</div>

    </div>
  )
}
