import { Link } from 'react-router-dom';
import style from './header.module.scss';
import Logo from '../../../../assets/img/logo.svg';

export const Header = () => {
  return (
    <div className={style.header}>
      <Link to={'/'}>
        <img className={style.logo} src={Logo} alt="Logotipo da e-duca" />
      </Link>
    </div>
  );
};
