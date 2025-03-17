"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define form validation schema using Zod
const formSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  phone: z.string().optional(),
  physician: z.string().min(2, "Referring physician is required"),
<<<<<<< HEAD
  modality: z.enum(["X-Ray", "CT", "MRI", "Ultrasound", "PET-CT"]),
=======
  modality: z.enum(["X_Ray", "CT", "MRI", "Ultrasound", "PET_CT"]),
>>>>>>> c3f08b9 (Study CRUD Added)
  history: z.string().optional(),
  bodyPart: z.string().min(2, "Specify body part"),
  urgency: z.enum(["Routine", "Urgent", "Stat"]),
  reportType: z.enum(["Preliminary", "Final"]),
  specialInstructions: z.string().optional(),
<<<<<<< HEAD
  dicomFiles: z.array(z.string()).optional(), // S3 URLs for DICOM files
  reportFiles: z.array(z.string()).optional(), // S3 URLs for report files
=======
>>>>>>> c3f08b9 (Study CRUD Added)
});

export default function PatientUploadForm() {
  const {
    register,
    handleSubmit,
<<<<<<< HEAD
=======
    reset,
>>>>>>> c3f08b9 (Study CRUD Added)
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

<<<<<<< HEAD
  const [dFiles, setDFiles] = useState<File[]>([]);
  const [rFiles, setRFiles] = useState<File[]>([]);

  const handleDicom = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDFiles([...dFiles, ...Array.from(event.target.files)]);
    }
  };

  const handleReport = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setRFiles([...rFiles, ...Array.from(event.target.files)]);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      // Mock function to upload files and get S3 URLs
      const uploadToS3 = async (files: File[]) => {
        const uploadedUrls = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
  
          // Replace this with your actual API endpoint for uploading to S3
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
  
          const result = await response.json();
          uploadedUrls.push(result.url); // Assuming API returns the file URL
        }
        return uploadedUrls;
      };
  
      // Upload files and get URLs
      const dicomUrls = await uploadToS3(dFiles);
      const reportUrls = await uploadToS3(rFiles);
  
      // Prepare final data object
      const formData = {
        ...data,
        dicomFiles: dicomUrls,
        reportFiles: reportUrls,
      };
  
      console.log("Final Form Data:", formData);
  
      // Send data to your backend
=======
  // const [rFiles, setRFiles] = useState<File[]>([]);

  // const handleReport = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setRFiles([...rFiles, ...Array.from(event.target.files)]);
  //   }
  // };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    console.log("onSubmit function called!");

    try {
      // Prepare final form data object
      const formData = { ...data };
      console.log("Final Form Data:", formData);
  
      // Send data to your backend API
>>>>>>> c3f08b9 (Study CRUD Added)
      const response = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Form submitted successfully");
<<<<<<< HEAD
=======
        reset();
        // Show success notification
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
>>>>>>> c3f08b9 (Study CRUD Added)
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
<<<<<<< HEAD
    }
  };
  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg max-sm:p-2 p-6 mt-10">
=======
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg max-sm:p-2 p-6 mt-10 relative">
       {/* Success Notification */}
       {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg text-center transition-opacity duration-500">
          ✅ Case submitted successfully!    
        </div>
      )}

>>>>>>> c3f08b9 (Study CRUD Added)
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Case</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-sm:space-y-2">
        {/* Patient Information */}
        <div className="grid grid-cols-1 max-lg:grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <h1 className=" font-medium text-gray-700">1. Patient Details</h1>
            <div className="flex flex-row gap-2 items-center">
              <label className="font-xs  min-w-20 flex-none">Full Name</label>
              <input
                {...register("fullName")}
                placeholder="Full Name"
                className=" w-full h-full border border-stone-500  px-1 py-[1px] text-gray-700 focus:outline-none"
                />
                {errors?.fullName && <p className="text-red-500">{String(errors.fullName.message)}</p>}
            </div>
            <div className="lg:grid grid-cols-2 max-lg:gap-5 justify-between items-center gap-8">
              <div className="flex gap-2 max-lg:mb-[2px]">
                <label className="font-xs min-w-20 flex-none">Age</label>
                <input
<<<<<<< HEAD
                  {...register("age")}
=======
                  {...register("age",  { valueAsNumber: false })}
>>>>>>> c3f08b9 (Study CRUD Added)
                  type="number"
                  placeholder="Age"
                  className="w-full h-full border border-stone-500  px-1 py-[1px] text-gray-700 focus:outline-none "
                  />
                  {errors?.age && <p className="text-red-500">{String(errors.age.message)}</p>}
              </div>
              <div className="flex gap-2 lg:justify-end ">
                <label className="font-xs max-lg:min-w-20 flex-none">Gender</label>
                <select
                  {...register("gender")}
                  className=" w-full h-full border bg-stone-100 border-stone-500 py-[1px] text-gray-700 focus:outline-none "
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            {/* <div className="flex flex-row gap-2 items-center"></div> */}
            <div className="flex flex-row gap-2 items-center">
              <label className="font-xs  min-w-20 flex-none ">Contact No</label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Contact No"
                className="w-full h-full border border-stone-500  px-1 py-[1px] text-gray-700 focus:outline-none "
                />
            </div>
          </div>

          {/* Clinical Information */}
          <div className="flex flex-col gap-1">
            <h1 className=" font-medium text-gray-700">
              2. Clinical Information
            </h1>
            <div className="flex max-sm:flex-col flex-row items-start">
              <label className="font-xs min-w-36 flex">
                Referring Physician
              </label>
              <input
                {...register("physician")}
                placeholder="Referring Physician"
                className=" w-full h-full border border-stone-500  px-1 py-[1px] text-gray-700 focus:outline-none"
                />
                {errors?.physician && <p className="text-red-500 ml-1">{String(errors.physician.message)}</p>}
            </div>
            <div className="flex max-sm:flex-col flex-row items-start">
              <label className="font-xs min-w-36 flex">Clinical History</label>
              <input
                {...register("history")}
                placeholder="Clinical History"
                className=" w-full h-full border border-stone-500  px-1 py-[1px] text-gray-700 focus:outline-none "
                />
            </div>
          </div>

          {/* Imaging Details */}
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-700">3. Imaging Details</h3>
            <div className="flex flex-row gap-2 items-center">
              <label  className="font-xs  min-w-20 flex-none">Modality</label>
              <select
                {...register("modality")}
                className="w-full h-full border border-stone-500 bg-stone-100 py-[1px]  text-gray-700 focus:outline-none"
              >
<<<<<<< HEAD
                <option value="X-Ray">X-Ray</option>
                <option value="CT">CT</option>
                <option value="PET-CT">PET-CT</option>
                <option value="MRI">MRI</option>
=======
                <option value="X_Ray">X-Ray</option>
                <option value="CT">CT</option>
                <option value="PET_CT">PET-CT</option>
                <option value="MRI">MRI</option>
                <option value="Ultrasound">Ultrasound</option>
>>>>>>> c3f08b9 (Study CRUD Added)
              </select>
            </div>
            <div className="flex flex-row gap-2 items-center mb-4">
              <label className="font-xs  min-w-20 flex-none">Study</label>
              <input
                {...register("bodyPart")}
                placeholder="Study"
                className="w-full h-full border border-stone-500  px-1 py-[1px] text-gray-700 focus:outline-none"
                />
                {errors?.bodyPart && <p className="text-red-500">{String(errors.bodyPart.message)}</p>}
            </div>
          </div>

          {/* Reporting Preferences */}
          <div className="flex flex-col gap-1 max-lg:-mt-4">
            <h1 className=" font-medium text-gray-700">
              4. Reporting Preferences
            </h1>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex max-sm:flex-col flex-row items-start">
                <label className="font-xs w-32 lg:w-36 flex-none">
                  Report Priority
                </label>
                <select
                  {...register("urgency")}
                  className=" w-full h-full border border-stone-500 bg-stone-100 py-[1px] text-gray-700 focus:outline-none"
                >
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Stat">Stat</option>
                </select>
              </div>
              <div className="flex max-sm:flex-col flex-row items-start">
                <label className="font-xs w-32 lg:w-36 flex-none">
                  Report Type
                </label>
                <select
                  {...register("reportType")}
                  className=" w-full h-full border border-stone-500 bg-stone-100 py-[1px] text-gray-700 focus:outline-none"
                >
                  <option value="Preliminary">Preliminary Report</option>
                  <option value="Final">Final Report</option>
                </select>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* DICOM File Upload */}
=======
          {/* DICOM File Upload
>>>>>>> c3f08b9 (Study CRUD Added)
          <div>
            <h3 className=" text-gray-700">
              Upload Previous Reports/Findings
            </h3>
            <label className="font-xs border-dashed border-2 hover:bg-stone-100 border-gray-300 p-2 flex flex-col items-center cursor-pointer">
              <span className="text-gray-600">
                Click to Upload or Drag & Drop
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleReport}
                multiple
                />
            </label>
            <ul className="mt-2 text-sm text-gray-500">
              {rFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
<<<<<<< HEAD
          </div>
          <div className="max-lg:-mt-4">
            <h3 className=" text-gray-700">Upload DICOM Files</h3>
            <label className="font-xs border-dashed border-2 hover:bg-stone-100 border-gray-300 p-2 flex flex-col items-center cursor-pointer">
              <span className="text-gray-600">
                Click to Upload or Drag & Drop
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleDicom}
                multiple
              />
            </label>
            <ul className="text-sm text-gray-500">
              {dFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
=======
          </div> */}
>>>>>>> c3f08b9 (Study CRUD Added)
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
<<<<<<< HEAD
          >
            Submit
=======
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-100"
                    fill="currentColor"
                    d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Submit"
            )}
>>>>>>> c3f08b9 (Study CRUD Added)
          </button>
        </div>
      </form>
    </div>
  );
}
