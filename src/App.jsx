import './App.css'
import { Header } from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


function App() {
  const data = useSelector((state)=> state.auth)
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
