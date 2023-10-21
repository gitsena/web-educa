import style from './pillar.module.scss';
import imgTeachers from '../../../../assets/img/specialist.svg';
import imgSymb from '../../../../assets/img/symbiosis.svg';
import imgContent from '../../../../assets/img/contents.svg';

export default function Pillar() {
    return (


        // <section className={style.container}>
        //     <div>
        //         <img src={imgContent} alt="Contents" />
        //         <p>Conteúdos verificados</p>
        //     </div>
        //     <div>
        //         <h2 className={style.title}>Nossos pilares</h2>
        //         <img src={imgSymb} alt="Symbiosis" />
        //         <p>Simbiose</p>
        //     </div>
        //     <div>
        //         <img src={imgTeachers} alt="Teachers" />
        //         <p>Professores especializados</p>
        //     </div>
        // </section>

        <section className={style.container}>
            <div className={style.contentGrid}>
                <div className={style.contentGrid__image}>
                    <img src={imgContent} alt="Contents" />
                    <h3>Conteúdos verificados</h3>
                </div>

                <div className={style.contentGrid__image}>
                    <h2 className={style.title}>Nossos pilares</h2>
                </div>

                <div className={style.contentGrid__image}>
                    <img src={imgTeachers} alt="Teachers" />
                    <h3>Professores especializados</h3>
                </div>
            </div>


            <div className={style.contentGrid__image}>
                <img src={imgSymb} alt="Symbiosis" />
                <h3>Simbiose</h3>
            </div>
        </section>


    );
}