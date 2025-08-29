
import axios from "axios";

export const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
});


export interface PropertyData {
  apartmentType: string;
  apartmentName: string;
  bhkType: string;
   noOfFloors: number;
    propertyAge: string;
    facing: string;
    buildUpArea: string;

}

const token = localStorage.getItem("token"); // or wherever you're storing it

export const postPropertyData = (data: PropertyData) => {
  return api.post("/api/properties", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
