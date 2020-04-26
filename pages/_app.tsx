import {ReactPropTypes, JSXElementConstructor} from 'react'
import '../styles/global.css'

type Props = {
  Component: JSXElementConstructor<any>,
  pageProps: ReactPropTypes
}

export default function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}
