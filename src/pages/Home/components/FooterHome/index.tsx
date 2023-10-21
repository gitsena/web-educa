import style from './footerHome.module.scss'

export default function FooterHome() {
  return (
    <div className={style.footerHome}>
      <div>
        <h4>Sobre nós</h4>
        <p>
          Com conteúdos especializados na área de exatas, a e-duca une
          professores e estudantes do ensino médio em uma cadeia simbiótica de
          ensinar e aprender. Damos suporte ao ensino acadêmico e solucionamos a
          busca por materiais de qualidade reunindo-o todos em uma só
          plataforma.
        </p>
      </div>

      <div>
        <h4>Info</h4>
        <p>Nossa Equipe</p>
        <p>Impacto </p>
        <p>Nossos Apoiadores</p>
      </div>

      <div>
        <h4>Contatos</h4>
        <p>educa.sptech@gmail.com.br</p>
        <p>(11) 99123-8765</p>
      </div>
    </div>
  )
}
