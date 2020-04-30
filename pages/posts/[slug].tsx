import ReactMarkdown from 'react-markdown'
import { GetStaticProps } from 'next'
import {Posts, getPosts} from '../../lib/postHelper'

interface Post {
  post: Posts
}

export default function PostTemplate({post}: Post) {
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <ReactMarkdown source={post.content}/>
    </div>
  )
}

export async function getStaticPaths() {
  const posts = getPosts()
  const paths = posts.map(el => ({params: {slug: el.slug}}))
 return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const posts = getPosts()
  if (params?.slug === undefined) throw new Error('Params not found')
  const post = posts.find(post => (post.slug === params.slug))

  return {
    props: {
      post 
    },
  };
}