import style from './formStep1.module.scss'
import { useNavigate } from 'react-router-dom'
import { useForm, FormActions } from '../../../utils/contexts/FormContext'
import { Theme } from '../components/Theme'
import { ChangeEvent, useEffect, useState } from 'react'
import img from '../../../assets/img/image10.svg'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'

export const FormStep1 = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useForm()
  const [invalid, setInvalid] = useState<boolean>(false)
  const [nameError, setNameError] = useState<boolean>(false)
  const [lastNameError, setLastNameError] = useState<boolean>(false)
  const [birthdateError, setBirthdateError] = useState<boolean>(false)
  const [careerTimeError, setCareerTimeError] = useState<boolean>(false)
  const [occupationError, setOccupationError] = useState<boolean>(false)

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 1
    })
  }, [])

  const handleNextStep = (e: Event) => {
    e.preventDefault()
    if (
      state.name.length >= 3 &&
      state.lastName.length >= 3 &&
      state.birthDate !== '' &&
      state.careerTime !== '' &&
      state.occupation !== ''
    ) {
      navigate('/cadastro/professor/etapa2')
      console.log(state)
    } else {
      setInvalid(true)
    }
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setName,
      payload: e.target.value
    })
    setNameError(false)
    setInvalid(false)
  }
  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setLastName,
      payload: e.target.value
    })
    setLastNameError(false)
    setInvalid(false)
  }
  const handleBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setBirthDate,
      payload: e.target.value
    })
    setBirthdateError(false)
    setInvalid(false)
  }

  const handleOccupationChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setOccupation,
      payload: e.target.value
    })
    setOccupationError(false)
    setInvalid(false)
  }
  const handleCareerTimenChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setCareerTime,
      payload: e.target.value
    })
    setCareerTimeError(false)
    setInvalid(false)
  }

  return (
    <>
      <Theme img={img} isTeacher>
        <div className={style.container}>
          <Input
            text="Nome:"
            value={state.name}
            type="text"
            placeholder="Nome"
            onChange={handleNameChange}
            onBlur={() => {
              if (state.name.length < 3 || state.name === '') {
                setNameError(true)
              }
            }}
          />
          <div className={style.error}>
            {nameError && <p>Por favor, preencha o nome</p>}
          </div>
          <Input
            text="Sobrenome:"
            value={state.lastName}
            type="text"
            placeholder="Sobrenome"
            onChange={handleLastNameChange}
            onBlur={() => {
              if (state.lastName.length < 3 || state.lastName === '') {
                setLastNameError(true)
              }
            }}
          />
          <div className={style.error}>
            {lastNameError && <p>Por favor, preencha o sobrenome</p>}
          </div>
          <Input
            text="Data de Nascimento:"
            value={state.birthDate}
            type="date"
            onChange={handleBirthDateChange}
            onBlur={() => {
              if (state.birthDate === '') {
                setBirthdateError(true)
              }
            }}
          />
          <div className={style.error}>
            {birthdateError && <p>Por favor, preencha a data de nascimento</p>}
          </div>
          <Input
            text="Área de atuação:"
            value={state.occupation}
            type="select"
            placeholder="Professor de Matemática"
            onChange={handleOccupationChange}
            onBlur={() => {
              if (state.occupation === '') {
                setOccupationError(true)
              }
            }}
          />
          <div className={style.error}>
            {occupationError && <p>Por favor, preencha a área de atuação</p>}
          </div>
          <Input
            text="Atuando desde:"
            value={state.careerTime}
            type="date"
            onChange={handleCareerTimenChange}
            onBlur={() => {
              if (state.careerTime === '') {
                setCareerTimeError(true)
              }
            }}
          />
          <div className={style.error}>
            {careerTimeError && <p>Por favor, preencha o tempo de carreira</p>}
            {invalid && (
              <p>Por favor, preencha todos os campos corretamente.</p>
            )}
          </div>
          <Button
            className={style.btnNext}
            title="Continuar"
            onClick={handleNextStep}
          />
          <Button
            className={style.btnLogin}
            title="Ir para login"
            path="/login"
          />
        </div>
      </Theme>
    </>
  )
}
