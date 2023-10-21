import Header from '../../components/Header'
import FooterHome from '../Home/components/FooterHome'
import Footer from '../../components/Footer'
import style from './error.module.scss'
import imageError from '../../assets/img/errorImg.svg'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'

export default function Error() {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div className={style.divError}>
        <img src={imageError} alt="Imagem de erro" />
        <p>Ops! Parece que a página que você está procurando não existe.</p>
        <Button
          className={style.btn}
          onClick={() => navigate(-1)}
          title="Voltar"
        />
      </div>
      <FooterHome />
      <Footer />
    </>
  )
}
