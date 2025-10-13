import React from 'react'
import HostingServicesHeader from '../components/hostingservices/HostingServicesHeader'
import HostingServices from '../components/hostingservices/HostingServices'
import FAQ from '../components/faq/FAQ'

const HostingServicesPage = () => {
  return (
    <div>
      <HostingServicesHeader/>
      <HostingServices/>
      <FAQ/>
    </div>
  )
}

export default HostingServicesPage
