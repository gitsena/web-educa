import style from './signUp.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import student from '../../../../assets/img/image09.svg';
import teacher from '../../../../assets/img/image10.svg';

type Props = {
  onClose?: () => void;
}

export const SignUp = ({ onClose }: Props) => {

    return (
      <div className={style.box}>
          <span onClick={onClose} className={'fas fa-times'}></span>
          <h2>Quero me cadastrar como</h2>
          <div className={style.cOption}>
            <img
              className={style.image}
              src={student}
              alt="student reference image"
            />
            <img
              className={style.image}
              src={teacher}
              alt="teacher reference image"
            />
            <Button
              className={style.btnStudent}
              path="/cadastro/estudante"
              title="Estudante"
            />
            <Button
              className={style.btnTeacher}
              path="/cadastro/professor/etapa1"
              title="Professor"
            />
          </div>
          <h3>Já tenho uma conta!</h3>
          <Link className={style.link} to={'/login'}>
            Fazer login
          </Link>
        </div>
  );
};
