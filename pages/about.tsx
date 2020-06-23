import { GetStaticProps} from 'next'
import { readFileSync } from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter';
import Layout from '../components/layout'
import style from '../styles/post.module.css'
import Footer from '../components/Footer'
import { author, footerCopyright, baseURL } from '../config.json'

const About = ({content, footer}: {content: string, footer: any}) => {
  return(
      <Layout title={"About"}>
          <>
              <div className={style.root}>
                  <ReactMarkdown source={content} />
          <Footer footer={footer} display='relative' />
              </div>
          </>
      </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const file = readFileSync('content/about.md').toString()
  const {data, content} = matter(file)

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = data.date.toLocaleDateString("en-US", options);
  const frontmatter = {...data, date: formattedDate}

  const dateNow = new Date()
  const footer = {
    author: author.name,
    copyRight: footerCopyright,
    link: baseURL,
    year: dateNow.getFullYear(),
  }

  return (
    {
    props: {
      content,
      footer,
      frontmatter
    }
  }
  )
}

export default About
