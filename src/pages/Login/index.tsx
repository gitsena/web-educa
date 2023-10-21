import style from './login.module.scss';
import { ChangeEvent, useState } from 'react';
import { FormActions, useForm } from '../../utils/contexts/FormContext';
import img from '../../assets/img/image08.svg';
import { Header } from '../SignUp/components/Header';
import { Modal } from '../../components/Modal';
import { SignUp } from '../SignUp/components/SignUp';
import { Button } from '../../components/Button';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import PostService from '../../services/post.service';
import Loaderr from '../../components/Loaderr';


export const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const data = {
    email: state.email,
    senha: state.password
  };

  const handleNextStep = async (e: Event) => {
    e.preventDefault();
    if (data.email === '' && data.senha === '') {
      setInvalid(true);
      return;
    }

    setLoading(true);

    try {
      await AuthService.login(data).then(
        () => {
          PostService.getUser().then(
            (response: any) => {
              console.log(response.data.perfis[0].nome);
              if (response.data.perfis[0].nome === 'ROLE_PROFESSOR') {
                navigate('/professor');
              } else {
                navigate('/estudante');
              }
            },
            (error: any) => {
              console.log('FORUM/ESTUDANTE/getUser: Erro', error.response);
              if (error.response && error.response.status === 403) {
                console.log('FORUM/ESTUDANTE/getUser: Erro de autenticação');
              }
            }
          );
        },
        (error: any) => {
          setInvalid(true);
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
      setInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setEmail,
      payload: e.target.value
    });
    setEmailError(false);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormActions.setPassword,
      payload: e.target.value
    });
    setPasswordError(false);
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.intro}>
          <img src={img} alt="" />
          <h3>Ainda não possui uma conta?</h3>
          <div onClick={() => setIsModalVisible(true)}>
            <a>Cadastrar-se</a>
          </div>
        </div>
        <div>
          <h1>Login</h1>
          <div className={style.containerForm}>
            <Input
              text="E-mail"
              type="email"
              value={state.email}
              placeholder="exemplo@email.com"
              onChange={handleEmailChange}
              onBlur={() => {
                if (data.email === '') {
                  setEmailError(true);
                }
              }}
            />
            <div className={style.error}>
              {emailError && <p>Por favor, preencha o email</p>}
            </div>
            <Input
              text="Senha:"
              type="password"
              value={state.password}
              placeholder="*******************"
              onChange={handlePasswordChange}
              onBlur={() => {
                if (data.senha === '') {
                  setPasswordError(true);
                }
              }}
            />
            <div className={style.error}>
              {passwordError && <p>Por favor, preencha a senha</p>}
              {invalid && (
                <p>Email ou senha inválidos. Tente novamente!</p>
              )}
            </div>
            <Button
              className={style.btnEnter}
              title="Entrar"
              onClick={handleNextStep}
            />
            {loading && <Loaderr/>}
          </div>
        </div>
        {isModalVisible ? (
          <Modal
            isOpen={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            <SignUp onClose={() => setIsModalVisible(false)} />
          </Modal>
        ) : null}
      </div>
    </>
  );
};
