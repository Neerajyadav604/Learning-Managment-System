import React from 'react'
import {toast} from "react-hot-toast"
import { apiconnector } from '../Apiconector';
import { catalogData } from '../apis';

const {
   CATALOGPAGEDATA_API,
} = catalogData ;


export const getCatalogaPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    console.log("99999",categoryId)
        const response = await apiconnector("POST", CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});
        console.log("999999:",response?.data?.success)

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}