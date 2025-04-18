import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalApi';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function Infosection({ trip }) {

  const [photoURL, setPhotoURL] = useState('');
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name);



    const PhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
    setPhotoURL(PhotoURL);
  })
  }
  return (
    <div>
      <img src={photoURL?photoURL:'placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl' />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5' >
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥤No. of Traveller:{trip.userSelection?.traveler}</h2>
          </div>
        </div>
        <Button><IoIosSend /> </Button>
      </div>
    </div>
  )
}

export default Infosection
