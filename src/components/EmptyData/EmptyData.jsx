import React from 'react';
import { Link } from 'react-router-dom';

const EmptyData = ({message}) => {
     return (
       <div className="h-[75vh] gap-5 flex flex-col justify-center items-center pb-16 ">
         <p className="text-red-500 dark:text-white text-xl lg:text-3xl">{message}</p>
       </div>
     );
};

export default EmptyData;