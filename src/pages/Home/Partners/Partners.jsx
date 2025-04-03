import React, { useEffect, useState } from "react";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import Container from "../../../components/Container/Container";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";

const Partners = () => {
    const [items,setItems]=useState([]);

    useEffect(()=>{
        fetch('partners.json')
            .then(res=>res.json())
            .then(data=>{
                setItems(data);
            })
        },[])
  return (
    <div className="dark:bg-gray-800  pb-10 lg:pb-20">
      <SectionHeader heading={"Our Partners"}></SectionHeader>
      <Container>
        <div className="flex justify-center items-center flex-wrap gap-10 mt-8 p-4">
          {items.map((item, index) => (
            <FadeInAnimation custom={index} key={item.id}>
              <img className="w-24 md:w-40" src={item.src} alt="" />
            </FadeInAnimation>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Partners;
