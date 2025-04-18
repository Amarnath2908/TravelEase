import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div
      className='relative h-screen w-full flex items-center justify-center'
      style={{
        backgroundImage: 'url("/thumb-1920-887690.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Semi-transparent overlay */}
      <div className='absolute inset-0 bg-white/40'></div>

      {/* Content */}
      <div className='relative flex flex-col items-center mx-4 md:mx-56 gap-9 z-10'>
        <h1 className='font-extrabold text-[50px] text-center'>
          <span className='text-[#f56551]'>Discover Your Next Adventure with AI :</span>
          Personalized Itineraries at Your Fingertips
        </h1>
        <p className='text-xl text-gray-500 text-center'>
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
          <Button className="text-lg px-6 py-2">Get Started, It's free</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero;
