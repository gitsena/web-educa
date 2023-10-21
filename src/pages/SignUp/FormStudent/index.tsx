import style from './formStudent.module.scss'
import { Theme } from '../components/Theme'
import { FormActions, useForm } from '../../../utils/contexts/FormContext'
import { ChangeEvent, useState } from 'react'
import img from '../../../assets/img/image09.svg'
import { Button } from '../../../components/Button'
import PostService from '../../../services/post.service'
import { Input } from '../../../components/Input'
import { useNavigate } from 'react-router-dom'

export const FormStudent = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useForm()
  const [invalid, setInvalid] = useState<boolean>(false)
  const [nameError, setNameError] = useState<boolean>(false)
  const [lastNameError, setLastNameError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [birthdateError, setBirthdateError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [isSamePassword, setIsSamePassword] = useState<boolean>(true)
  const [sucessMessage, setSucessMessage] = useState<boolean>(false)

  const data = {
    nome: state.name,
    sobrenome: state.lastName,
    email: state.email,
    dataNasc: state.birthDate,
    senha: state.password
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (
      data.nome.length >= 3 &&
      data.sobrenome.length >= 3 &&
      data.email != '' &&
      data.dataNasc != '' &&
      data.senha.length >= 8
    ) {
      PostService.registerStudent(data)
        .then(function (response) {
          console.log(response.status)
          setSucessMessage(true)

          setTimeout(() => {
            navigate('/login')
          }, 2000)
        })
        .catch(function (error) {
          console.log(error)
        })
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
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setEmail,
      payload: e.target.value
    })
    setEmailError(false)
    setInvalid(false)
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setPassword,
      payload: e.target.value
    })
    setPasswordError(false)
    setInvalid(false)
  }
  const handleCPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setConfirmPassword,
      payload: e.target.value
    })
    setIsSamePassword(true)
    setInvalid(false)
  }

  return (
    <>
      <Theme img={img} isTeacher={false}>
        <div className={style.container}>
          <div className={style.sucess}>
            {sucessMessage && <h3>Cadastro realizado com sucesso!</h3>}
          </div>
          <Input
            text="Nome:"
            value={state.name}
            type="text"
            placeholder="Nome"
            onChange={handleNameChange}
            onBlur={() => {
              if (data.nome.length < 3 || data.nome === '') {
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
              if (data.sobrenome.length < 3 || data.sobrenome === '') {
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
              if (data.dataNasc === '') {
                setBirthdateError(true)
              }
            }}
          />
          <div className={style.error}>
            {birthdateError && <p>Por favor, preencha a data de nascimento</p>}
          </div>
          <Input
            text="E-mail:"
            type="email"
            value={state.email}
            placeholder="exemplo@email.com"
            onChange={handleEmailChange}
            onBlur={() => {
              if (data.email === '') {
                setEmailError(true)
              }
            }}
          />
          <div className={style.error}>
            {emailError && <p>Por favor, preencha o email</p>}
          </div>
          <Input
            text="Senha:"
            type="password"
            value={state.password}
            placeholder="Mínimo de 8 caracteres"
            onChange={handlePasswordChange}
            onBlur={() => {
              if (data.senha === '' || data.senha.length < 8) {
                setPasswordError(true)

                if (data.senha == state.confirmPassword) {
                  setIsSamePassword(true)
                }
              }
            }}
          />
          <div className={style.error}>
            {passwordError && <p>A senha deve ter 8 ou mais caracteres.</p>}
          </div>
          <Input
            text="Confirmar senha:"
            type="password"
            value={state.confirmPassword}
            placeholder="8 caracteres (letras, números)"
            onChange={handleCPasswordChange}
            onBlur={() => {
              if (data.senha !== state.confirmPassword) {
                setIsSamePassword(false)
              }
            }}
          />
          <div className={style.error}>
            {!isSamePassword && <p>As senhas não coincidem.</p>}
            {invalid && (
              <p>Por favor, preencha todos os campos corretamente.</p>
            )}
          </div>

          <Button
            className={style.btnNext}
            title="Finalizar cadastro"
            onClick={handleSubmit}
          />

          <Button
            className={style.btnLogin}
            path="/login"
            title="Ir para login"
          />

        </div>
      </Theme>
    </>
  )
}
