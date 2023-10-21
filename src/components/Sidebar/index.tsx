import style from './sidebar.module.scss'
import Logo from '../../assets/img/logo.svg'
import { Perfil } from './Perfil'
import perfilTeacher from '../../assets/img/perfilTeacher.svg'
import perfilStudent from '../../assets/img/perfilStudent.svg'
import { MenuItemsTeacher } from './MenuItemsTeacher'
import { MenuItemsStudent } from './MenuItemsStudent'
import { Button } from '../Button'
import AuthService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { differenceInYears, parseISO } from 'date-fns';

type Props = {
  isTeacher?: boolean
  name: string
  lastName: string
  careerTime?: string
  occupation?: string
  handleChosenItem: any
  selectedItem: any
}


export const Sidebar = ({
  isTeacher,
  name,
  occupation,
  careerTime,
  lastName,
  handleChosenItem
}: // selectedItem
  Props) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    AuthService.logout()
    navigate('/login')
    window.location.reload()
  }

  // Função para tratar a data e calcular a quantidade de anos de carreira
  const calculateCareerTime = (startDate: string) => {
    if (!startDate) {
      return ''; // Retorna uma string vazia se a data não estiver definida
    }

    try {
      const currentDate = new Date(); // Data atual
      const startDateObj = parseISO(startDate); // Converte a string da data de início para um objeto Date

      const yearsDiff = differenceInYears(currentDate, startDateObj); // Calcula a diferença em anos

      return String(yearsDiff); // Retorna a quantidade de anos como uma string
    } catch (error) {
      console.error('Erro ao calcular a quantidade de anos de carreira:', error);
      return ''; // Retorna uma string vazia em caso de erro
    }
  };

  return (
    <>
      <div className={style.container}>
        <img className={style.logo} src={Logo} alt="Logotipo da e-duca" />
        {isTeacher ? (
          <Perfil
            photo={perfilTeacher}
            name={`${name} ${lastName}`}
            userType="Professor(a)"
            labOne="Tempo de carreira:"
            careerTime={`${calculateCareerTime(careerTime || '')} anos`}
            labtwo="Área de atuação:"
            occupation={occupation}
          />
        ) : (
          <Perfil
            photo={perfilStudent}
            name={`${name} ${lastName}`}
            userType="Aluno(a)"
          />
        )}
        <div className={style.navigation}>
          {isTeacher ? (
            <>
              <h4>Conteúdos</h4>
              {MenuItemsTeacher.map((item) => {
                return (
                  <button onClick={(e) => handleChosenItem(e)} key={item.id}>
                    {item.title}
                  </button>
                )
              })}
            </>
          ) : (
            <>
              {MenuItemsStudent.map((item) => {
                return (
                  <button onClick={(e) => handleChosenItem(e)} key={item.id}>
                    {item.title}
                  </button>
                )
              })}
            </>
          )}
        </div>
        <Button onClick={handleLogout} className={style.btn} title="Sair" />
      </div>
    </>
  )
}
