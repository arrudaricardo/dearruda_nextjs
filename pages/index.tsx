import Home from '../components/home'
import Social from '../components/social'
import Layout from '../components/layout'
import Iam from '../components/iam'
import Footer from '../components/Footer'
import { GetStaticProps } from 'next'
import { postsExist } from '../lib/postHelper'
import { author, footerCopyright, baseURL } from '../config.json'
import { genRssFile } from '../lib/genRss'

type Index = {
  footer?: {
    year: number,
    author: string,
    link: string,
    copyRight: string,
  }
  hasPosts: boolean

}

export default function Index({ hasPosts, footer }: Index) {
  return (
    <Layout title='Home'>
      <>
        <Home hasPosts={hasPosts}>
          <>
            <Iam />
            <Social />
          </>
        </Home>
        <Footer footer={footer} display='fixed' />
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  genRssFile()
  const dateNow = new Date()
  const hasPosts = postsExist()
  const footer = {
    author: author.name,
    copyRight: footerCopyright,
    link: baseURL,
    year: dateNow.getFullYear(),
  }

  return {
    props: {
      hasPosts,
      footer,
    },
  };
}