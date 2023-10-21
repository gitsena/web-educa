import style from "./footer.module.scss"

export default function Footer() {
  return (
    <div className={style.footer}>
      <span>
        ©2022 e-duca <br />
        Todos os direitos reservados.
      </span>
    </div>
  );
}
