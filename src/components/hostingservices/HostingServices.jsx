import React from 'react';
import { hostingServicesData } from "../../utils/hostingServicesData";
import "../hostingservices/HostingServices.css"

const HostingServices = () => {
  return (
    <div className='hosting-services-container'>
      {hostingServicesData.map((service, index) => (
        <div key={service.id} className={`hosting-services-list ${index % 2 !== 0 ? 'reverse' : ''}`}>
          {/* Image Section */}
          <div className="hosting-services-image">
            <img src={service.image} alt={service.title} />
          </div>

          {/* Content on Right */}
          <div className="hosting-services-content sora">
            <h2 className="hosting-services-title">{service.title}</h2>
            <p className="hosting-services-description">{service.description}</p>
            <button className="hosting-services-button">
              {service.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HostingServices;