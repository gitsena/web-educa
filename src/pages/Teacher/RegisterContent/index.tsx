import style from './registerContent.module.scss'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select'
import { useState, useEffect } from 'react'
import { SelectType } from './SelectType'
import PostService from '../../../services/post.service'
import { UpdateSuccess } from '../UpdateContent/UpdateSuccess'
import { Modal } from '../../../components/Modal'


type Props = {
  onClose: () => void
}

export const RegisterContent = ({ onClose }: Props) => {
  const [habilities, setHabilities] = useState<any[]>([])
  const [hability, setHability] = useState("")
  const [type, setType] = useState("")
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState<boolean>(false)
  const [workload, setWorkload] = useState('')
  const [workloadError, setWorkloadError] = useState<boolean>(false)
  const [texto, setTexto] = useState('')
  const [textoError, setTextoError] = useState<boolean>(false)
  const [videoId, setVideoId] = useState('')
  const [videoIdError, setVideoIdError] = useState<boolean>(false)
  const [invalid, setInvalid] = useState<boolean>(false)
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  const data = {
    titulo: title,
    tempoEstimado: workload,
    habilidade: {
      codigo: hability
    },
    texto: texto,
    urlVideo: `https://www.youtube.com/embed/${videoId}`
  }

  useEffect(() => {
    PostService.getHability().then(
      (response: any) => {
        setHabilities(response.data)
      },
      (error: any) => {
        console.log('RegisterContent/TEACHER/getHability: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log(
            'RegisterContent/TEACHER/getHability: Erro de autenticação'
          )
        }
      }
    )
  }, [])

  const registerContent = () => {
    console.log(data)
    if (
      data.titulo !== '' &&
      data.tempoEstimado !== '' &&
      data.habilidade.codigo !== '' &&
      (data.texto !== '' || videoId !== '')
    ) {
      PostService.registerContent(data).then(
        (response: any) => {
          console.log(response.data)
          setShowUpdateSuccess(true)
        },
        (error: any) => {
          console.log(
            'RegisterContent/TEACHER/registerContent: Erro',
            error.response
          )
          if (error.response && error.response.status === 403) {
            console.log(
              'RegisterContent/TEACHER/registerContent: Erro de autenticação'
            )
          }
        }
      )
    } else {
      setInvalid(true)
    }
  }

  useEffect(() => {
    if (showUpdateSuccess) {
      const timer = setTimeout(() => {
        setShowUpdateSuccess(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
        onClose();

      };
    }
  }, [showUpdateSuccess]);

  return (
    <>
      <div className={style.box}>
        <Input
          text="Título:"
          type="text"
          placeholder="Exemplo"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          onBlur={() => {
            if (data.titulo === '') {
              setTitleError(true)
            }
          }}
        />
        <div className={style.error}>
          {titleError && <p>Título não pode ser vazio.</p>}
        </div>
        <div className={style.cSelect}>
          <Select
            text="Habilidade"
            value={hability}
            onChange={(e: any) => setHability(e.target.value)}
          >
            {habilities?.map((habilidade) => {
              return (
                <option key={habilidade.idHabilidade}>{habilidade.codigo}</option>
              )
            })}
          </Select>
          <Select
            text="Tipo"
            value={type}
            onChange={(e: any) => setType(e.target.value)}
          >
            {SelectType.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </div>
        {type === "1" ? (
          <>
            <Input
              text="Id do vídeo:"
              type="url"
              placeholder="https://www.youtube.com/IdVideo"
              value={videoId}
              onChange={(e: any) => setVideoId(e.target.value)}
              onBlur={() => {
                if (videoId === '') {
                  setVideoIdError(true)
                }
              }}
            />
            <div className={style.error}>
              {videoIdError && <p>Id do vídeo não pode ser vazio.</p>}
            </div>
          </>
        ) : type === "2" ? (
          <>
            <Input
              text="Texto:"
              type="text"
              placeholder="Exemplo"
              value={texto}
              onChange={(e: any) => setTexto(e.target.value)}
              onBlur={() => {
                if (data.texto === '') {
                  setTextoError(true)
                }
              }}
            />
            <div className={style.error}>
              {textoError && <p>Texto deve estar entre 1 e 5000 caracteres.</p>}
            </div>
          </>
        ) : null}

        <Input
          text="Carga horária estimada:"
          type="number"
          placeholder="10"
          value={workload}
          onChange={(e: any) => setWorkload(e.target.value)}
          onBlur={() => {
            if (data.tempoEstimado === '') {
              setWorkloadError(true)
            }
          }}
        />
        <div className={style.error}>
          {workloadError && <p>Carga horária não pode ser vazia.</p>}
          {invalid && <p>Por favor, preencha todos os campos corretamente.</p>}
        </div>
        <div className={style.cBtn}>
          <Button className={style.btnBack} title="Voltar" onClick={onClose} />
          <Button
            className={style.btnRegister}
            title="Cadastrar"
            onClick={() => registerContent()}
          />
        </div>
      </div>
      {showUpdateSuccess && (
        <Modal
          isBottomless
          isOpen={showUpdateSuccess}
          onClose={() => {
            setShowUpdateSuccess(false);
            onClose();
          }}
        >
          <UpdateSuccess onClose={() => {
            setShowUpdateSuccess(false);
            onClose();
          }} />
        </Modal>
      )}
    </>
  )
}
