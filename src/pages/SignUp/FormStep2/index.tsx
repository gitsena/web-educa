import style from './formStep2.module.scss'
import { Theme } from '../components/Theme'
import { ChangeEvent, useEffect, useState } from 'react'
import { FormActions, useForm } from '../../../utils/contexts/FormContext'
import img from '../../../assets/img/image11.svg'
import { Button } from '../../../components/Button'
import PostService from '../../../services/post.service'
import { Input } from '../../../components/Input'
import { useNavigate } from 'react-router-dom'

export const FormStep2 = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useForm()
  const [invalid, setInvalid] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [isSamePassword, setIsSamePassword] = useState<boolean>(true)
  const [sucessMessage, setSucessMessage] = useState<boolean>(false)

  const data = {
    nome: state.name,
    sobrenome: state.lastName,
    email: state.email,
    dataNasc: state.birthDate,
    senha: state.password,
    inicioAtuacao: state.careerTime,
    areaAtuacao: state.occupation
  }

  useEffect(() => {
    dispatch({
      type: FormActions.setCurrentStep,
      payload: 2
    })
  }, [])

  const handleNextStep = () => {
    if (
      data.nome != '' &&
      data.sobrenome != '' &&
      data.email != '' &&
      data.dataNasc != '' &&
      data.senha.length >= 8 &&
      data.inicioAtuacao != '' &&
      data.areaAtuacao != ''
    ) {
      PostService.registerTeacher(data)
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
      <Theme img={img} isTeacher>
        <div className={style.container}>
          <div className={style.sucess}>
            {sucessMessage && <h3>Cadastro realizado com sucesso!</h3>}
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
            text="Confirmar senha"
            type="password"
            value={state.confirmPassword}
            placeholder="Mínimo de 8 caracteres"
            onChange={handleCPasswordChange}
            onBlur={() => {
              if (data.senha !== state.confirmPassword) {
                setIsSamePassword(false)
              }
            }}
          />
          <div className={style.error}>
            {!isSamePassword && <p>As senhas não coincidem.</p>}
          </div>
          {invalid && (
            <p>Por favor, preencha todos os campos corretamente.</p>
          )}
          <Button
            className={style.btnNext}
            title="Finalizar cadastro"
            onClick={handleNextStep}
          />
          <Button
            className={style.btnLogin}
            title="Voltar"
            path="/cadastro/professor/etapa1"
          />
        </div>
      </Theme>
    </>
  )
}
