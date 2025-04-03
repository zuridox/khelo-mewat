import React, { useEffect, useState } from 'react';
import { BsArrowUp } from "react-icons/bs";

const ScrollUp = () => {
    const [isVisible,setIsVisible] = useState(false);

    const toggleVisibility=()=>{
        if(window.pageYOffset > 300){
            setIsVisible(true);
        }else{
            setIsVisible(false);
        }
    }

    /* on click scroll up handler */
    const handleScrollToTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    }

    /* toggle the button */
    useEffect(()=>{
        window.addEventListener('scroll',toggleVisibility);

        return ()=>{
            window.removeEventListener('scroll',toggleVisibility);
        }
    },[])
    return (
      <div>
        {isVisible && (
          <button className="fixed bottom-8 right-8  text-white px-3 py-3 text-xl  rounded bg-gradient-to-r from-red-500 to-yellow-500 transition-all hover:scale-95" onClick={handleScrollToTop}>
            <BsArrowUp />
          </button>
        )}
      </div>
    );
};

export default ScrollUp;