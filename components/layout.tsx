import Head from 'next/head'
import { ReactElement } from 'react'
import styles from '../styles/layout.module.css'

type Props = {
  children: ReactElement,
  title: string
}

const Layout = ({children, title}: Props) => {
  return (
    <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main className={styles.main}>
      {children}
    </main>
    <footer>{'I`m here to stay'}</footer>
    </>
  )
}


export default Layout