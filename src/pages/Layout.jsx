import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'
import CoinTicker from '../components/common/CoinTicker'

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
      <CoinTicker/>
    </div>
  )
}

export default Layout
