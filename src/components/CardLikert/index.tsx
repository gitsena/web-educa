import React, { useState, useEffect } from 'react';
import style from './cardLikert.module.scss';
import { ImageItems } from './ImageItems';
import PostService from '../../services/post.service';

type Props = {
  contentId: any;
};

export const CardLikert = ({ contentId }: Props) => {
  const [likertResponded, setLikertResponded] = useState(false);

  const handleRating = (text: string) => {
    const data = {
      idConteudo: contentId,
      avaliacao: text,
    };

    PostService.registerRating(data)
      .then((response: any) => {
        console.log(response.data);
        setLikertResponded(true);
      })
      .catch((error: any) => {
        console.log('LIKERT: Erro ao avaliar', error.response);
        if (error.response && error.response.status === 403) {
          console.log('LIKERT: Erro na autenticação');
        }
      });
  };

  useEffect(() => {
    if (likertResponded) {
      const timer = setTimeout(() => {
        setLikertResponded(false);
      }, 3000); // Defina o tempo em milissegundos para que o aviso desapareça após 3 segundos (3000 ms)

      return () => clearTimeout(timer); // Limpa o temporizador quando o componente é desmontado
    }
  }, [likertResponded]);

  return (
    <div className={style.card}>
      <h3>Gostou da aula? Nos dê sua opinião!</h3>
      <div>
        {ImageItems.map((item) => (
          <div key={item.id} className={style.col}>
            <img
              src={item.src}
              onClick={() => handleRating(item.text)}
              alt="Opção"
            />
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      {likertResponded && <a>Obrigado pelo feedback!</a>}
    </div>
  );
};
