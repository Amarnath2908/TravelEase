import React from 'react'
import { useState } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect } from 'react';

function HotelCardItem({ hotel, index }) 
    {
        
          const [photoURL, setPhotoURL] = useState('');
          useEffect(() => {
            hotel && GetPlacePhoto();
          }, [hotel])
          const GetPlacePhoto = async () => {
            const data = {
              textQuery:hotel?.hotelName
            }
            const result = await GetPlaceDetails(data).then(resp => {
              console.log(resp.data.places[0].photos[3].name);
        
        
        
            const PhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setPhotoURL(PhotoURL);
          })
        }
    return (
        <div>
            <a
                key={index}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel?.hotelName}, ${hotel?.hotelAddress}`)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:scale-105 transition-all cursor-pointer block'
            >
                <div className='mt-2'>
                    <img src={photoURL?photoURL:'placeholder.jpg'} alt={hotel.hotelName} className='rounded-xl w-full h-40 object-cover' />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍{hotel.hotelAddress}</h2>
                        <h2 className='text-sm'>💰{hotel?.price}</h2>
                        <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default HotelCardItem
