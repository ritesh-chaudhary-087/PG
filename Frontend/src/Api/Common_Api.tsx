
import axios from "axios";

export const baseURL = "http://localhost:5000";

const api = axios.create({baseURL});


export interface PropertyData {
  apartmentType: string;
  apartmentName: string;
  bhkType: string;
   noOfFloors: number;
    propertyAge: string;
    facing: string;
    buildUpArea: string;
    city: string;

}
const token = localStorage.getItem("token"); // or wherever you're storing it

// Add property (POST)
export const postPropertyData = async (formData: any, token: string) => {
  return await axios.post(`${baseURL}/api/properties/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // token from login
      "Content-Type": "application/json",
    },
  });
};

// Get all properties (GET)
export const getAllProperties = async () => {
  return await axios.get(`${baseURL}/api/properties/`);
};


// Add property (POST)
export const postLocalityData = async (formData: any, token: string) => {
  return await axios.post(`${baseURL}/api/locality/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // token from login
      "Content-Type": "application/json",
    },
  });
};

// Get all properties (GET)
export const getAllLocality = async () => {
  return await axios.get(`${baseURL}/api/locality/`);
};
