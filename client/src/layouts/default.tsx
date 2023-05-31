import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Default() {
  return (
    <>
      <Header />
      <main className="container relative mx-auto animate-reveal px-2.5 pb-16 pt-5 lg:py-10">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
