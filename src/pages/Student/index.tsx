import { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Forum } from './Forum'
import { Topics } from './Forum/Topics'
import { Home } from './Home'
import PostService from '../../services/post.service'
import style from './student.module.scss'

export const Student = () => {
  const [chosenComponent, setChosenComponent] = useState(<Home />)
  const [chosenItem, setChosenItem] = useState()

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
        console.log('ESTUDANTE/getUser: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('ESTUDANTE/getUser: Erro de autenticação')
        }
      }
    )
  }, [])

  const handleChosenItem = (chosen: any) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const chosenItem = chosen.target.innerText
    setChosenItem(chosenItem)
    switch (chosenItem) {
      case 'Página Inicial':
        setChosenComponent(<Home />)
        break
      case 'Fórum de dúvidas':
        setChosenComponent(<Topics />)
        break
      case 'Meus tópicos':
        setChosenComponent(<Forum />)
        break
      default:
        setChosenComponent(<Home />)
    }
  }

  return (
    <div className={style.container}>
      <Sidebar
        name={student.name}
        lastName={student.lastName}
        handleChosenItem={handleChosenItem}
        selectedItem={chosenItem}
      />
      <div className={style.innerContainer}>{chosenComponent}</div>

    </div>
  )
}
