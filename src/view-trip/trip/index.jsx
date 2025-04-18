import React, { useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import {db} from '@/service/firebaseConfig'
import Infosection from "../components/Infosection";
import Hotels from '../components/Hotels'; 
import PlacesToVisit from '../components/PlacesToVisit'; 
import Footer from '../components/Footer'; 
import HotelCardItem from "../components/HotelCardItem";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    console.log("Trip ID from URL:", tripId);
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  /* Function to fetch trip data from Firestore */
  const GetTripData = async () => {
    try {
      if (!tripId) {
        console.error("Trip ID is undefined");
        return;
      }

      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such Document found!");
        toast.error("No trip found!");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Error fetching trip data");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/*Information Section*/}
      <Infosection trip={trip}/>
      {/*Recommended Hotels*/}
      <Hotels trip = {trip}/>
      {/*Daily Plan*/}
      <PlacesToVisit trip = {trip}/>
      {/* Footer */}
      <Footer trip = {trip}/>
    </div>
  );
}

export default Viewtrip;
