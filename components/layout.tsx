import Head from 'next/head'
import { ReactElement } from 'react'

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
      {children}
    <footer>{'I`m here to stay'}</footer>
    </>
  )
}


export default Layout