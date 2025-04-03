import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import FadeInAnimation from '../../components/FadeInAnimation/FadeInAnimation';
import { Link } from 'react-router-dom';
import ScrollPageTop from '../../components/ScrollPageTop/ScrollPageTop';
import EmptyData from '../../components/EmptyData/EmptyData';
import {getInstructor} from '../../api/users.js';
import { Helmet } from 'react-helmet-async';
import Loader from '../../components/Loader/Loader.jsx';

const InstructorsPage = () => {
    const [instructors,setInstructors] =useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
    getInstructor()
      .then(data=>{
        setInstructors(data);
        setLoading(false);
      }).catch(error=>{
        console.log(error.message);
        setLoading(false);
      })
    },[])

    return (
      <div
        className="dark:bg-gray-800 pb-10 lg:pb-20 md:pt-20"
        id="instructors"
      >
        <Helmet>
          <title>Instructors</title>
        </Helmet>
        <ScrollPageTop />
        <Container>
          <SectionHeader heading={"Our Instructors"}></SectionHeader>
          {loading ? (
            <Loader height={'h-[50vh]'}></Loader>
          ) : (
            <>
              {instructors &&
              Array.isArray(instructors) &&
              instructors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                  {instructors.map((instructor, index) => (
                    <FadeInAnimation key={instructor._id} custom={index}>
                      <div className="card card-compact max-w-md  shadow-xl">
                        <figure>
                          <img
                            className="w-96 h-96 object-cover hover:grayscale transition-all duration-300"
                            src={instructor.image}
                            alt="Shoes"
                          />
                        </figure>
                        <div className="card-body text-gray-800 dark:text-white">
                          <h2 className="card-title ">{instructor.name}</h2>
                          <p className="-mt-2 text-base">
                            <span className="font-semibold">Email:</span>{" "}
                            {instructor.email}
                          </p>
                          <span>
                            <Link
                              to={`/user/${instructor.email}`}
                              className="btn btn-sm text-white bg-amber-500 custom-btn"
                            >
                              Learn More
                            </Link>
                          </span>
                        </div>
                      </div>
                    </FadeInAnimation>
                  ))}
                </div>
              ) : (
                <EmptyData message={"No Instructor Data Found"} />
              )}
            </>
          )}
        </Container>
      </div>
    );
};

export default InstructorsPage;