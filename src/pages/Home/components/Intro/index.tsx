import style from './intro.module.scss';
import imgStudents from '../../../../assets/img/student.svg';
import imgTeacher from '../../../../assets/img/teacher.svg';
import iconMedal from '../../../../assets/img/medal.svg';
import iconTrophy from '../../../../assets/img/trophy.svg';

export default function Intro() {
  return (
    <>
      <h2 className={style.title}>Como funciona?</h2>
      <section className={style.container}>
        <img src={imgStudents} alt="Student" className={style.image}/>
        <div className={style.introStudent}>
          <img src={iconMedal} alt="Medal star icon" />
          <h3> Benefícios para o estudante</h3>
          <li>
           Conteúdos focados na área de exatas e filtrados por professores
           especializados.
          </li>
          <li>
           Fácil comunicação entre professores e alunos.
          </li>
          <li>
            Praticidade de escolher assuntos desejados para estudo.
          </li>
          <li>
            Consegue avaliar conteúdos postados pelos professores. Mostrando se o conteúdo esta relevante
            ou não para o professor.
          </li>
        </div>

        <div className={style.introTeacher}>
          <img src={iconTrophy} alt="Trophy icon" />
          <h3>Benefícios para o professor </h3>
          <li>
           Consegue ver a qualidade e relevância de seus conteúdos.
          </li>
          <li>
           Praticidade de subir conteúdos na plataforma.
          </li>
          <li>
            Dashborads detalhando sobre seu conteúdo.
          </li>
          <li>
            Praticidade de tirar dúvidas dos alunos.
          </li>
        </div>
        <img src={imgTeacher} alt="Teacher" className={style.image}/>
      </section>
    </>
  );
}
