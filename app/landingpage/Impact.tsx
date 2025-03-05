import React from "react";
import { FaPeopleGroup, FaRegCircleCheck, FaRegClock } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";

function Impact() {
  return (
    <div>
      <div className="p-14 flex flex-col justify-center items-center gap-4">
        <h2 className="pt-8 text-4xl font-bold text-stone-100 text-center ">
          Our Impact in Numbers
        </h2>
        <h3 className="text-center text-xl font-light text-stone-500 lg:max-w-3xl">
          Delivering excellence in teleradiology services across the globe
        </h3>
      </div>
      <div className="p-4 max-lg:mx-4 lg:mx-14 mb-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 relative">
        <div className="flex flex-col justify-center text-center items-center bg-stone-800 rounded-lg p-8 hover:scale-105 transition-transform duration-300">
          <FaRegCircleCheck className="p-5 rounded-full h-20 w-20 bg-teal-900 text-teal-400 mb-4 bg-opacity-50" />
          <h2 className="text-teal-500 text-4xl font-bold">500000</h2>
          <h3 className="text-stone-200 text-lg">Reports Delivered</h3>
        </div>
        <div className="flex flex-col justify-center text-center items-center bg-stone-800 rounded-lg p-8 hover:scale-105 transition-transform duration-300">
          <FaPeopleGroup className="p-5 rounded-full h-20 w-20 bg-teal-900 text-teal-400 mb-4 bg-opacity-50" />
          <h2 className="text-teal-500 text-4xl font-bold">200</h2>
          <h3 className="text-stone-200 text-lg">Healthcare Partners</h3>
        </div>
        <div className="flex flex-col justify-center text-center items-center bg-stone-800 rounded-lg p-8 hover:scale-105 transition-transform duration-300">
          <FaRegClock className="p-5 rounded-full h-20 w-20 bg-teal-900 text-teal-400 mb-4 bg-opacity-50" />
          <h2 className="text-teal-500 text-4xl font-bold">30</h2>
          <h3 className="text-stone-200 text-lg">Minutes Average TAT</h3>
        </div>
        <div className="flex flex-col justify-center text-center items-center bg-stone-800 rounded-lg p-8 hover:scale-105 transition-transform duration-300">
          <TbTargetArrow className="p-5 rounded-full h-20 w-20 bg-teal-900 text-teal-400 mb-4 bg-opacity-50" />
          <h2 className="text-teal-500 text-4xl font-bold">99</h2>
          <h3 className="text-stone-200 text-lg">% Accuracy Rate</h3>
        </div>
      </div>
    </div>
  );
}

export default Impact;
