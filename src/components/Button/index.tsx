import { Link } from 'react-router-dom'
import style from './button.module.scss'

type Props = {
  onClick?: any
  className?: any
  path?: any
  title: string
  onChange?: any
}

export const Button = ({
  onClick,
  className,
  path,
  title,
  onChange
}: Props) => {
  return (
    <Link to={path ?? ''}>
      <button
        className={`${style.btn} ${className}`}
        onClick={onClick}
        onChange={onChange}
      >
        {title}
      </button>
    </Link>
  )
}
