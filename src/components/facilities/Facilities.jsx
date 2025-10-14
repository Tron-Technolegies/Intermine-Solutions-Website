import React from 'react';
import { facilitiesData } from "../../utils/facilitiesData";
import "../facilities/Facilities.css";

const Facilities = ({ limit }) => {
  const displayedFacilities = limit ? facilitiesData.slice(0, limit) : facilitiesData;

  return (
    <div className='facilities-container'>
      {displayedFacilities.map((facility, index) => (
        <div key={facility.id} className={`facilities-list ${index % 2 !== 0 ? 'reverse' : ''}`}>
          
          {/* Image Section */}
          <div className="facilities-image">
            <img src={facility.image} alt={facility.title} />
          </div>

          {/* Content Section */}
          <div className="facilities-content sora">
            <h2 className="facilities-title">{facility.title}</h2>
            <p className="facilities-description">{facility.description}</p>
            <button className="facilities-button">
              {facility.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Facilities;
