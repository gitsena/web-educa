import style from './searchBar.module.scss'
import search from '../../assets/img/search.svg'
type Props = {
  placeholder?: string
  value: any
  onChange: any
}

export const SearchBar = ({ placeholder, value, onChange }: Props) => {
  return (
    <div className={style.container}>
      <img src={search} />
      <input
        name="search"
        id="search"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  )
}
