import { Button } from "@mui/material";
import React from "react";
import { FaArrowRight, FaCheck, FaUserDoctor } from "react-icons/fa6";

function Ourteam() {
  return (
    <div id="ourteam" className="bg-stone-900 ">
      <div className="p-14 flex flex-col justify-center items-center gap-4">
        <h2 className="pt-8 text-4xl font-bold text-center text-stone-100">
          Expert Radiologists Team
        </h2>
        <h3 className="text-center text-xl font-light text-stone-500 lg:max-w-3xl">
          Our globally certified radiologists bring decades of specialized
          experience across all imaging modalities.
        </h3>
      </div>
      <div className="max-lg:mx-4 lg:mx-14 mb-10 grid lg:grid-cols-3 md:grid-cols-2 gap-8 relative">
      <div className="bg-stone-800 shadow-md p-8 rounded-lg flex flex-col gap-2">
          <div className="flex flex-col text-center items-center">
            <FaUserDoctor className="p-6 rounded-full h-20 w-20 bg-teal-900 text-teal-400 mb-2 bg-opacity-50" />
            <h2 className="text-stone-100 text-xl font-bold pb-1">
            Dr. Sarah Mitchell
            </h2>
            <h3 className="text-teal-500 pb-3 text-sm">
            Neuroradiology Specialist
            </h3>
          </div>

          <div className="flex flex-row gap-2 justify-start items-center">
            <span className="text-green-500">
              <FaCheck />
            </span>
            <span className="text-stone-100 font-light text-sm">15+ years of experience</span>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center">
            <span className="text-green-500">
              <FaCheck />
            </span>
            <span className="text-stone-100 font-light text-sm">Board Certified in Neuroradiology</span>
          </div>
        </div>
        <div className="bg-stone-800 shadow-md p-8 rounded-lg flex flex-col gap-2">
          <div className="flex flex-col text-center items-center">
          <FaUserDoctor className="p-6 rounded-full h-20 w-20 bg-teal-900 text-teal-400 mb-2 bg-opacity-50" />
            <h2 className="text-stone-100 text-xl font-bold pb-1">
            Dr. James Wilson
            </h2>
            <h3 className="text-teal-500 pb-3 text-sm">
            Musculoskeletal Imaging Expert
            </h3>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center">
            <span className="text-green-500">
              <FaCheck />
            </span>
            <span className="text-stone-100 font-light text-sm">12+ years of experience</span>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center">
            <span className="text-green-500">
              <FaCheck />
            </span>
            <span className="text-stone-100 font-light text-sm">Fellowship in MSK Imaging</span>
          </div>
        </div>
        <div className="bg-stone-800 shadow-md p-8 rounded-lg flex flex-col gap-2">
          <div className="flex flex-col text-center items-center">
          <FaUserDoctor className="p-6 rounded-full h-20 w-20 bg-teal-900 text-teal-400 mb-2 bg-opacity-50" />
            <h2 className="text-stone-100 text-xl font-bold pb-1">
            Dr. Emily Chen
            </h2>
            <h3 className="text-teal-500 pb-3 text-sm">
            Emergency Radiology Specialist
            </h3>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center">
            <span className="text-green-500">
              <FaCheck />
            </span>
            <span className="text-stone-100 font-light text-sm">10+ years of experience</span>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center">
            <span className="text-green-500">
              <FaCheck />
            </span>
            <span className="text-stone-100 font-light text-sm">Emergency Medicine Certified</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row max-sm:flex-col justify-between rounded-lg gap-4 max-lg:mx-4 mx-14 p-8 bg-stone-800">
        <div className="bg-none">
            <h2 className="text-5xl font-bold text-center text-teal-400">50+</h2>
            <h3 className="text-lg text-center text-stone-100">Expert Radiologists</h3>
        </div>
        <div className="bg-none">
            <h2 className="text-5xl font-bold text-center text-teal-400">24/7</h2>
            <h3 className="text-lg text-center text-stone-100">Availability</h3>
        </div>
        <div className="bg-none">
            <h2 className="text-5xl font-bold text-center text-teal-400">15+</h2>
            <h3 className="text-lg text-center text-stone-100">Specializations</h3>        </div>
        <div className="bg-none">
            <h2 className="text-5xl font-bold text-center text-teal-400">99%</h2>
            <h3 className="text-lg text-center text-stone-100">Expert Radiologists</h3>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button className="my-8  bg-teal-500 text-teal-50 text-md h-[52px] lg:px-9 font-bold hover:bg-teal-600">
          Work with Our Experts
          <span><FaArrowRight/></span>
        </Button>
        
      </div>
    </div>
  );
}

export default Ourteam;
