import style from './theme.module.scss';
import { ReactNode } from 'react';
import { Header } from '../Header';
import { Button } from '../../../../components/Button';
type Props = {
  children: ReactNode;
  img: string;
  isTeacher: boolean;
};

export const Theme = ({ children, img, isTeacher }: Props) => {
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.containerForm}>
          <div>{children}</div>
        </div>
        <div className={style.containerOption}>
          <h1>Cadastrar-se como</h1>

          <Button
            path="/cadastro/estudante"
            title="Estudante"
            className={`${isTeacher ? `${style.btnStudent}` : `${style.btnStudentSelected}`}`}
          />

          <Button
            path="/cadastro/professor/etapa1"
            title="Professor"
            className={`${isTeacher ? `${style.btnTeacherSelected}` : `${style.btnTeacher}`}`}
          />

          <img src={img} className={style.image} alt=""/>
        </div>
      </div>
    </>
  );
};
