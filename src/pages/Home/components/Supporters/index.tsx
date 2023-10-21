import style from './supporters.module.scss'
import redV from '../../../../assets/img/Ellipse2.png'
import accenture from '../../../../assets/img/Ellipse3.png'
import deloite from '../../../../assets/img/Ellipse4.png'
import safra from '../../../../assets/img/Ellipse5.png'
import sptech from '../../../../assets/img/Ellipse6.png'
import send from '../../../../assets/img/sendmail.png'
import { Input } from '../../../../components/Input'
import { useState } from 'react'
import axios from 'axios'

export default function Supporters() {
  const [supporter, setSupporter] = useState({
    name: '',
    email: ''
  })
  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const sendMail = async () => {
    axios
      .post('http://localhost:8080/mailer', {
        email: supporter.email
      })
      .then(function (response) {
        console.log(response.status)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function verify() {
    if (supporter.email == '') {
      setErrorMessage(true)
    } else {
      console.log('VERIFICOU' + supporter)
      sendMail()
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    verify()
    console.log(supporter)
  }

  return (
    <section className={style.container}>
      <h2 className={style.title}>Apoiadores do projeto e-duca</h2>
      <div className={style.innerContainer}>
        <img src={redV} alt="RedVentures logo" />
        <img src={accenture} alt="Accenture logo" />
        <img src={deloite} alt="Deloite logo" />
        <img src={safra} alt="Safra logo" />
        <img src={sptech} alt="SPTech logo" />
      </div>
      <div className={style.supporter}>
        Seja um apoiador!
        <div className={style.ipt}>
          <Input
            type={'email'}
            placeholder={'Insira seu email'}
            value={supporter.email}
            onChange={(e: any) =>
              setSupporter({ ...supporter, email: e.target.value })
            }
            onBlur={() => {
              if (supporter.email == '') {
                setErrorMessage(true)
              }
            }}
          />

          <img src={send} onClick={onSubmit} />
        </div>
      </div>
      {errorMessage && <p>Por favor, preencha o e-mail corretamente!</p>}
    </section>
  )
}
