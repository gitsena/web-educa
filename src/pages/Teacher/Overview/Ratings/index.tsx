/* eslint-disable @typescript-eslint/no-unused-vars */
import style from './ratings.module.scss'
import { useEffect, useState } from 'react'
import postService from '../../../../services/post.service'
type Props = {
  onClose: () => void
}

export const Ratings = ({ onClose }: Props) => {
  const [teacherRatings, setTeacherRatings] = useState<any>([])

  const imgs = [
    {
      id: 1,
      src: 'https://th.bing.com/th/id/R.b3a381dc9f71708e0d69c723db864f73?rik=wRRAr80DMy4Rvw&riu=http%3a%2f%2fimagensemoldes.com.br%2fwp-content%2fuploads%2f2018%2f06%2fEmoji-Muito-Bravo-PNG.png&ehk=TNPFI2LajVczy8lXTq%2bJ51qulnfMCHOmEZXTID%2fUfaQ%3d&risl=&pid=ImgRaw&r=0',
      text: 'Não gostei',
      quantity: teacherRatings[2]?.quantidade,
      color: '#1524a7'
    },
    {
      id: 2,
      src: 'https://imagensemoldes.com.br/wp-content/uploads/2018/06/Emoji-Triste-PNG.png',
      text: 'Poderia melhorar',
      quantity: teacherRatings[4]?.quantidade,
      color: '#4a7dff'
    },
    {
      id: 3,
      src: 'https://imagensemoldes.com.br/wp-content/uploads/2018/06/Emoji-Normal-PNG.png',
      text: 'Não sei',
      quantity: teacherRatings[3]?.quantidade,
      color: '#00d3d6'
    },
    {
      id: 4,
      src: ' https://th.bing.com/th/id/R.b2ba6def4f1cbcc10ddc0fafae20862d?rik=NSujvaSReSt2yA&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f1061%2f1924%2fproducts%2fSlightly_Smiling_Emoji_Icon_34f238ed-d557-4161-b966-779d8f37b1ac_grande.png%3fv%3d1513251058&ehk=xM%2bRbAWgTHEv0SkgzIeNB8iq%2bvao1duqqiEBIUzF7z0%3d&risl=&pid=ImgRaw&r=0',
      text: 'Gostei',
      quantity: teacherRatings[1]?.quantidade,
      color: '#e408c1'
    },
    {
      id: 5,
      src: 'https://www.freepngimg.com/download/icon/1000583-smile-emoji-free-icon.png',
      text: 'Amei!',
      quantity: teacherRatings[0]?.quantidade,
      color: '#6c0ba2'
    }
  ]

  useEffect(() => {
    postService.getRatings().then(
      (response: any) => {
        setTeacherRatings(response.data)
        console.log('QUANTIDADE DE AVALIACAO', response.data)
      },
      (error: any) => {
        console.log('HOME/Professor/getUser: Erro', error.response)
        if (error.response && error.response.status === 403) {
          console.log('HOME/Professor/getUser: Erro de autenticação')
        }
      }
    )
  }, [])

  return (
    <div className={style.card}>
      {imgs.reverse().map((item) => (
        <div className={style.innerContainer} key={item.id}>
          <div className={style.imgContainer}>
            <img src={item.src} alt="Opção" />
          </div>
          <div className={style.textContainer}>
            <h3 style={{color: item.color}}> {item.text} </h3>
            <span>{item.quantity}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
