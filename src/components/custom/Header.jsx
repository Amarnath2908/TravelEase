import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      GetUserProfile(tokenResponse);
    },
    onError: (error) => console.log("Login failed:", error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href="/" className="flex items-center">
        <img
          src='/ChatGPT Image Apr 18, 2025, 02_17_23 AM.png'
          alt="TravelEase Logo"
          className="h-16 w-auto"
        />
      </a>
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
              <Button variant='outline' className='rounded-full'>+Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button variant='outline' className='rounded-full'>My Trips</Button>
            </a>
            <a href='/about-us'>
              <Button variant='outline' className='rounded-full'>About Us</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className='flex items-center gap-3'>
            <a href='/about-us'>
              <Button variant='outline' className='rounded-full'>About Us</Button>
            </a>
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          </div>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="/ChatGPT Image Apr 18, 2025, 02_17_23 AM.png"
                alt="TravelEase Logo"
                className="h-20 w-auto mx-auto"
              />
              <h2 className="font-bold text-lg mt-7">Sign in with google</h2>
              <p>Sign in with Google Authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
