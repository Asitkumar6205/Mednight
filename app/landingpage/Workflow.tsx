import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";

function Workflow() {
  return (
    <div id="workflow">
    <div className="mt-4 pt-14 flex flex-col justify-center items-center gap-4">
        <h2 className="text-4xl font-bold text-white text-center">
          Our Streamlined Workflow
        </h2>
        <h3 className="text-center text-xl font-light text-stone-400 lg:max-w-3xl">
          Experience a seamless and efficient diagnostic process designed for
          optimal patient care.
        </h3>
      </div>
      <Timeline position="alternate" className="my-8">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className="flex flex-row items-center gap-6">
              <div className="text-stone-100 bg-stone-800 rounded-md lg:max-w-md p-6">
                <h2 className="text-xl pb-2 font-bold text-teal-500">
                  Image Upload
                </h2>
                Secure DICOM transfer of medical images through our encrypted
                platform, ensuring patient data protection and fast
                transmission.
              </div>
              <div className="flex justify-center items-center">
                <h2 className="bg-teal-500 h-12 w-12 flex justify-center items-center font-bold text-lg text-white px-2 rounded-full">
                  1
                </h2>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className="flex flex-row justify-end items-center gap-6">
              <div className="flex justify-center items-center">
                <h2 className="bg-teal-500 h-12 w-12 flex justify-center items-center font-bold text-lg text-white px-2 rounded-full">
                  2
                </h2>
              </div>
              <div className="text-stone-100 bg-stone-800 rounded-md lg:max-w-md p-6 text-left">
                <h2 className="text-xl pb-2 font-bold text-teal-500">
                  Expert Assignment
                </h2>
                Cases are automatically assigned to specialized radiologists
                based on expertise and modality for optimal interpretation.
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className="flex flex-row items-center gap-6">
              <div className="text-stone-100 bg-stone-800 rounded-md lg:max-w-md p-6">
                <h2 className="text-xl pb-2 font-bold text-teal-500">
                  Diagnosis & Reporting
                </h2>
                Thorough analysis and detailed reporting by experienced
                radiologists using state-of-the-art diagnostic tools.
              </div>
              <div className="flex justify-center items-center">
                <h2 className="bg-teal-500 h-12 w-12 flex justify-center items-center font-bold text-lg text-white px-2 rounded-full">
                  3
                </h2>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className="flex flex-row justify-end items-center gap-6">
              <div className="flex justify-center items-center">
                <h2 className="bg-teal-500 h-12 w-12 flex justify-center items-center font-bold text-lg text-white px-2 rounded-full">
                  4
                </h2>
              </div>
              <div className="text-stone-100 bg-stone-800 rounded-md lg:max-w-md p-6 text-left">
                <h2 className="text-xl pb-2 font-bold text-teal-500">
                  Quality Assurance
                </h2>
                Rigorous quality checks and peer review process to ensure
                accurate and reliable diagnostic reports.
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className="flex flex-row items-center gap-6">
              <div className="text-stone-100 bg-stone-800 rounded-md lg:max-w-md p-6">
                <h2 className="text-xl pb-2 font-bold text-teal-500">
                  Report Delivery
                </h2>
                Instant report delivery through secure channels with immediate
                notification to healthcare providers.
              </div>
              <div className="flex justify-center items-center">
                <h2 className="bg-teal-500 h-12 w-12 flex justify-center items-center font-bold text-lg text-white px-2 rounded-full">
                  5
                </h2>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <div className="flex justify-center items-center">
        <Button className="mb-14 bg-teal-500 text-md h-[52px] lg:px-9 font-bold hover:bg-teal-600">
          Start Your Journey
          <span><FaArrowRight/></span>
        </Button>
      </div>
    </div>
  );
}

export default Workflow;
