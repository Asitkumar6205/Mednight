import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowRight, FaRegClock } from "react-icons/fa6";
import { HiOutlineChip } from "react-icons/hi";
import { LuScanText } from "react-icons/lu";
import { TbCube3dSphere, TbReportMedical } from "react-icons/tb";

function Services() {
  return (
    <div id="services" className="bg-white">
      <div className="p-14 flex flex-col justify-center items-center gap-4">
        <h2 className="pt-8 text-4xl font-bold text-stone-800 text-center ">
          Our Comprehensive Services
        </h2>
        <h3 className="text-center text-xl font-light text-stone-500 lg:max-w-3xl">
          Advanced teleradiology solutions across all imaging modalities,
          delivering precise diagnostics with rapid turnaround times.
        </h3>
      </div>
      <div className="max-lg:mx-4 lg:mx-14 mb-14 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-8 relative">
        <div className="bg-stone-100 p-8 rounded-lg shadow-md">
          <HiOutlineChip className="h-14 w-14 text-teal-500 mb-4" />
          <h2 className="text-stone-800 text-lg font-bold mb-2">X-Ray Reporting</h2>
          <h3 className="text-stone-500 font-medium">
          Expert interpretation of routine and emergency X-rays with detailed analysis and quick reporting.
          </h3>
        </div>
        <div className="bg-stone-100 p-8 rounded-lg shadow-md">
          <TbCube3dSphere className="h-14 w-14 text-teal-500 mb-4" />
          <h2 className="text-stone-800 text-lg font-bold mb-2">CT Scan Analysis</h2>
          <h3 className="text-stone-500 font-medium">
          Comprehensive CT scan interpretation with 3D reconstruction capabilities and specialized reporting.
          </h3>
        </div>
        <div className="bg-stone-100 p-8 rounded-lg shadow-md">
          <LuScanText className="h-14 w-14 text-teal-500 mb-4" />
          <h2 className="text-stone-800 text-lg font-bold mb-2">MRI Interpretation</h2>
          <h3 className="text-stone-500 font-medium">
          Detailed magnetic resonance imaging analysis with specialized focus on neurological and musculoskeletal studies.
          </h3>
        </div>
        {/* <div className="bg-stone-100 p-8 rounded-lg shadow-md">
          <TbReportMedical className="h-14 w-14 text-teal-500 mb-4" />
          <h2 className="text-stone-800 text-lg font-bold mb-2">Ultrasound Reports</h2>
          <h3 className="text-stone-500 font-medium">
          Expert ultrasound interpretation including general, vascular, and specialized diagnostic sonography.
          </h3>
        </div> */}
      </div>
      <div className="flex justify-center items-center">
        <Button className="mb-14 bg-teal-500 text-md h-[52px] lg:px-9 font-bold hover:bg-teal-600">
          Get Started with Our Services
          <span><FaArrowRight/></span>
        </Button>
        
      </div>
    </div>
  );
}

export default Services;
