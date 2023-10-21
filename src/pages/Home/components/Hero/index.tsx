import style from './hero.module.scss'
// import img from '../../../../assets/img/galax.svg'

export default function Hero() {
  return (
    <section className={style.container}>
      <div className={style.innerContainer}>
        <h1>A plataforma que faz o aprendizado decolar</h1>
        <p>
          <b>Com conteúdos especializados na área de exatas, </b>a{' '}
          <span>e-duca</span> une professores e estudantes do ensino médio em
          uma cadeia simbiótica de ensinar e aprender. Damos suporte ao ensino
          acadêmico e solucionamos a busca por materiais de qualidade reunindo-o
          todos em uma só plataforma.
        </p>
      </div>
      <div className={style.hero}>
        <img src="../../images/galax.svg" alt="space galax" />
      </div>
    </section>
  )
}
