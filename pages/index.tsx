import Home from '../components/home'
import Social from '../components/social'
import Layout from '../components/layout'

export default function Index() {
  return (
    <Layout title='Home'>
    <Home>
      <Social/>
    </Home>
    </Layout>
  )
}
