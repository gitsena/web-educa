import style from './feedbacks.module.scss'

export default function Feedbacks() {
  return (
    <section className={style.feedbacks}>
      <h2 className={style.title}>Feedbacks</h2>
      <div className={style.cards}>
        <div className={style.card}>
          <aside className={style.titleCard}>
            <div className={style.circle}></div>
            <div className={style.textTitle}>
              <h2>Roberto Silva</h2>
              <h3>Aluno</h3>
            </div>
          </aside>

          <p>
            Ótima plataforma! Graças ao E-duca consegui Realizar as provas dos
            vestibulares com mais confiança na área de exatas!
          </p>
        </div>
        <div className={style.card}>
          <aside className={style.titleCard}>
            <div className={style.circle}></div>
            <div className={style.textTitle}>
              <h2>Marcos Souza</h2>
              <h3>Aluno</h3>
            </div>
          </aside>

          <p>
           Vocês são demais! Excelente plataforma! Muita informação para os estudos!
          </p>
        </div>
        <div className={style.card}>
          <aside className={style.titleCard}>
            <div className={style.circle}></div>
            <div className={style.textTitle}>
              <h2>Pablo Lucas</h2>
              <h3>Aluno</h3>
            </div>
          </aside>

          <p>
          Uma plataforma incrível que proporciona a aprendizagem de conhecimentos e valores!Professores competentes
          que nos ajudam a entender melhor o conteúdo desta área tão temida! 
          </p>
        </div>
      </div>
    </section>
  )
}
