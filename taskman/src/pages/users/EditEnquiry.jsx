import React, { useState } from "react";
import EditForm from "../../components/EditForm";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5"
const EditEnquiry = () => {
  const navigate = useNavigate()
  const [isLoading, setIsloading] = useState(false);
  const goBackToHome = ()=>{
    navigate('/home' , {replace:true})
  }
  return (
    <>
      <div className="px-6 py-2 md:flex hidden cursor-pointer gap-4" ><p onClick={goBackToHome} className=" bg-gradient-to-r from-emerald-600 to-emerald-700 flex text-white rounded-lg items-center justify-center text-sm gap-2 px-6 p-2"><IoArrowBackSharp size={20}/> Go to home </p></div>
      <div className="max-w-2xl w-[100%] mx-auto flex my-8 items-center">
        <EditForm setIsloading={setIsloading} />
        <Loader showLoader={isLoading} />
      </div>
    </>
  );
};

export default EditEnquiry;
