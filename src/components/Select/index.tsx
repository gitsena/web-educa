import { ReactNode } from 'react'
import style from './select.module.scss'
type Props = {
  text: string
  value: string
  onChange: any
  children?: ReactNode
  placeholder?: string
}

export const Select = ({ text, value, onChange, children }: Props) => {
  return (
    <div className={style.form}>
      <label>{text}</label>
      <select value={value} onChange={onChange}>
        <option disabled value="">
          Selecione uma opção
        </option>
        {children}
      </select>
    </div>
  )
}
