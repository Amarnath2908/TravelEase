
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Input from "../components/ui/input";
import { Button } from "../components/ui/button";
import { AI_PROMPT, SelectBudgetOptions } from "../contants/options";
import { SelectTravelesList } from "../contants/options";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";



function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleInputChange = (name, value) => {
    if (name == 'noOfDays' && value > 5) {
      console.log("Please enter the Trip days less than 5")
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      GetUserProfile(tokenResponse);
    },
    onError: (error) => console.log("Login failed:", error),
  });


  const [error, setError] = useState("");

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }


    if (!formData?.noOfDays) {
      setError("Please enter the number of days for your trip.");
      toast.error("Please enter the number of days for your trip.");
      return;
    }

    if (formData.noOfDays > 5) {
      setError("Trip days should not exceed 5.");
      toast.error("Trip days should not exceed 5. Please choose 5 or fewer.");
      return;
    }

    setError(""); // Clear error if valid
    toast.success("Trip has been successfully generated! 🚀");
    console.log("Generated Trip:", formData);

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);


    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(await result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())

  }
  const SaveAiTrip = async (TripData) => {

    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId

    });

    setLoading(false);

    navigate(`/view-trip/${docId}`);
  }


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
      onGenerateTrip();
    })
  }


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <ToastContainer />
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences </p>
      <div className='mt-20 flex flex-col gap-10 '>
        <div>
          <h2 className='text-xl my-3 font-medium'
          >What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place || "", // Avoid undefined value
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />


        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>
            How many days are you planning your trip
          </h2>
          <Input type='number' min="1" placeholder={'Ex.3'}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
  ${formData?.budget === item.title ? 'shadow-lg border-black' : ''}
  `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
  ${formData?.traveler === item.people ? 'shadow-lg border-black' : ''}
  `}
            >
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-20 justify-end flex'>
        <Button
          disabled={loading}
          onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> :
            'Generate Trip'
          }</Button>
      </div>
      <Dialog open={openDialog} onOpenChange= {setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="/ChatGPT Image Apr 18, 2025, 02_17_23 AM.png"
                style={{ width: '100px', height: '100px' }} // Adjust size here
                alt="Sign in with Google"
              />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in with Google Authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <>
                  <FcGoogle className="h-7 w-7" />
                  Sign in with Google
                </>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>


  )
}


export default CreateTrip
