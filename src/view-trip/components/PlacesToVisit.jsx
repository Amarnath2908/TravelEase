import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
    <div>
      {itinerary && Object.entries(itinerary).map(([dayKey, dayData], dayIndex) => (
        <div key={dayKey} className='mt-5' >
     
          <h3 className='font-semibold text-md mb-1'>
            {`Day ${dayIndex + 1} - ${dayData.theme}`}
          </h3>

          <div className='grid md:grid-cols-2 gap-5'>


            {dayData.plan.map((place, index) => (
              <div key={index}>
                <div className=''>
                <PlaceCardItem place={place} />
                </div>
              </div>
            ))}
        </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
[]