import ReactMarkdown from 'react-markdown'
import { GetStaticProps } from 'next'
import Prism from 'prismjs'
import Layout from '../../components/layout'
import style from '../../styles/post.module.css'
import { author, footerCopyright, baseURL } from '../../config.json'
import { Posts, getPosts } from '../../lib/postHelper'


function CodeBlock({ language, value }: { language: string, value: string }) {
  const prismLanguages = Prism.languages[language]
  const html = prismLanguages? Prism.highlight(value, prismLanguages , language) : value
  const cls = `language-${language}`
  return (<pre>
    <code className={cls} 
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </pre>)
}
interface Post {
  post: Posts,
  footer: any
}

export default function PostTemplate({ post, footer }: Post) {
  return (
    <Layout title={post.frontmatter.title!} footer={footer}>
      <div className={style.root}>
        <h1>{post.frontmatter.title}</h1>
        <ReactMarkdown source={post.content} renderers={{ code: CodeBlock }} />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = getPosts()
  const paths = posts.map(el => ({ params: { slug: el.slug } }))
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getPosts()
  if (params?.slug === undefined) throw new Error('Params not found')
  const post = posts.find(post => (post.slug === params.slug))

  const dateNow = new Date()
  const footer = {
    author: author.name,
    copyRight: footerCopyright,
    link: baseURL,
    year: dateNow.getFullYear(),
  }

  return {
    props: {
      post,
      footer
    },
  };
}
