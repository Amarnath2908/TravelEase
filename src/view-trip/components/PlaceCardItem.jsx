import React from 'react'
import { FaMapLocation } from "react-icons/fa6";
import { Button } from '@/components/ui/button'
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails } from '@/service/GlobalApi';

function PlaceCardItem({place}) {
  
    const [photoURL, setPhotoURL] = useState('');
    useEffect(() => {
      place && GetPlacePhoto();
    }, [place])
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: place.placeName
      }
      const result = await GetPlaceDetails(data).then(resp => {
        console.log(resp.data.places[0].photos[3].name);
  
  
  
      const PhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoURL(PhotoURL);
    })
  }
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place?.placeName}`)}`}>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoURL?photoURL:'/placeholder.jpg'}
      className='w-[130px] h-[130px] rounded-xl object-cover'/>
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-500'>{place.placeDetails}</p>
        <h2 className='mt-2'>⏱️{place.timeTravel}</h2>
       
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
