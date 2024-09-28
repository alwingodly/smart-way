import React, { useState } from 'react';
import TaskForm from '../../components/TaskForm';
import Loader from '../../components/Loader';


const AddEnquery = () => {
  const [isLoading, setIsloading] = useState(false);
  return(
  <div className="max-w-2xl w-[100%] mx-auto flex mt-8 items-center">
    <TaskForm setIsloading={setIsloading}/>
    <Loader showLoader={isLoading} />
  </div>
)};

export default AddEnquery;
