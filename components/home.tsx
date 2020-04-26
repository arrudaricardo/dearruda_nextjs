import config from '../config.json'
import style from '../styles/home.module.css'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement
}

const Home = ({children}: Props) => {
  return (
  <div className={style.home}>
    <div className={ style["home-center"] }>
        <h1 className={ style["home-title"] }>{ config.title }</h1>
        { children }
        { config.subTitle && <p className={ style["home-subtitle"] } >{ config.subTitle }</p> }
    </div>
  </div>
  )
}

export default Home