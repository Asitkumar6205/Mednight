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
  modality: z.enum(["X_Ray", "CT", "MRI", "Ultrasound", "PET_CT"]),
  history: z.string().optional(),
  bodyPart: z.string().min(2, "Specify body part"),
  urgency: z.enum(["Routine", "Urgent", "Stat"]),
  reportType: z.enum(["Preliminary", "Final"]),
  specialInstructions: z.string().optional(),
});

export default function PatientUploadForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [rFiles, setRFiles] = useState<File[]>([]);

  const handleReport = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setRFiles([...rFiles, ...Array.from(event.target.files)]);
    }
  };

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
      const response = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        reset();
        // Show success notification
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto border-[1px] border-stone-200 shadow-lg max-sm:p-2 p-6 mt-4 relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg text-center transition-opacity duration-500">
          ✅ Case submitted successfully!
        </div>
      )}

      <h2 className="text-2xl font-semibold text-stone-800 mb-6">
        Upload Case
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-sm:space-y-2"
      >
        {/* Patient Information */}
        <div className="grid grid-cols-1 max-lg:grid-cols-1 lg:grid-cols-2 gap-4 ">
          {/* Clinical Information */}
          <div className="flex flex-col gap-1 order px-6 py-4 bg-stone-200 shadow-lg">
            <h1 className=" font-medium text-stone-700">
              1. Referring Doctor/Physician
            </h1>
            <div className="flex max-sm:flex-col flex-row items-start">
              <label className="font-xs min-w-36 flex">Doctor Name</label>
              <input
                {...register("physician")}
                placeholder="Doctor/Physician Name"
                className=" w-full h-full border border-stone-500  px-1 py-[1px]  focus:outline-none"
              />
              {errors?.physician && (
                <p className="text-red-500 ml-1">
                  {String(errors.physician.message)}
                </p>
              )}
            </div>
          </div>

          {/* Reporting Preferences */}
          <div className="flex flex-col gap-1 order px-6 py-4 bg-stone-200 shadow-lg">
            <h1 className=" font-medium text-stone-700">
              2. Reporting Preferences
            </h1>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex max-sm:flex-col flex-row items-start">
                <label className="font-xs w-32 lg:w-36 flex-none">
                  Report Priority
                </label>
                <select
                  {...register("urgency")}
                  className=" w-full h-full border border-stone-500 bg-stone-100 py-[1px] text-stone-700 focus:outline-none"
                >
                  <option value="Routine">Routine</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Stat">Stat</option>
                </select>
              </div>
            </div>
          </div>

          {/* Report File Upload */}
          <div className="border flex flex-row justify-between px-6 py-4 bg-stone-200 shadow-lg">
            {/* Left side - Clinical History/Report */}
            <div className="flex flex-1 flex-col">
              <h3 className="text-stone-700">3. Clinical History/Report</h3>
              <textarea className="focus:outline-none border flex-1 resize-none"></textarea>
            </div>

            {/* Right side - Upload Section */}
            <div className="flex flex-col ml-4 w-[160px] justify-center ">
              <h1 className="text-stone-600 text-md">Upload Documents</h1>
              <div>
                <label className="font-xs border-dashed border-2 bg-stone-100 hover:bg-stone-200 border-stone-400 p-2 flex flex-col items-center cursor-pointer">
                  <span className="text-stone-600 text-sm">
                    Upload or Drag/Drop
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleReport}
                    multiple
                  />
                </label>

                {/* Fixed List to Prevent Overflow */}
                <ul className="mt-2 text-sm text-stone-500 max-w-full break-words">
                  {rFiles.map((file, index) => (
                    <li
                      key={index}
                      className="truncate overflow-hidden text-ellipsis w-full"
                    >
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col gap-1">
            <h1 className=" font-medium text-stone-700">
              1. Assign Radiologist
            </h1>
            <div className="flex max-sm:flex-col flex-row items-start">
              <label className="font-xs min-w-36 flex">User Name</label>
              <input
                {...register("history")}
                placeholder=""
                className=" w-full h-full border border-stone-500  px-1 py-[1px] text-stone-700 focus:outline-none "
                />
            </div>
            <div className="flex max-sm:flex-col flex-row items-start">
              <label className="font-xs min-w-36 flex">
                Referring Physician
              </label>
              <input
                {...register("physician")}
                placeholder="Referring Physician"
                className=" w-full h-full border border-stone-500  px-1 py-[1px]  focus:outline-none"
                />
                {errors?.physician && <p className="text-red-500 ml-1">{String(errors.physician.message)}</p>}
            </div>
          </div> */}

          {/* Imaging Details */}
          <div className="flex flex-col gap-1 border justify-between px-6 py-4 bg-stone-200 shadow-lg">
            <h3 className="text-stone-700">4. Study Details</h3>
            <div className="flex flex-row gap-2 items-center">
              <label  className="font-xs  min-w-20 flex-none">Modality</label>
              <select
                {...register("modality")}
                className="w-full h-full border border-stone-500 bg-stone-100 py-[1px]  text-stone-700 focus:outline-none"
              >
                <option value="X_Ray">X-Ray</option>
                <option value="CT">CT</option>
                <option value="PET_CT">PET-CT</option>
                <option value="MRI">MRI</option>
                <option value="Ultrasound">Ultrasound</option>
              </select>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label  className="font-xs  min-w-20 flex-none">View</label>
              <select
                {...register("modality")}
                className="w-full h-full border border-stone-500 bg-stone-100 py-[1px]  text-stone-700 focus:outline-none"
              >
                <option value="PA">PA</option>
                <option value="AP">AP</option>
                <option value="LAT">LAT</option>
                <option value="Oblique">Oblique</option>
                <option value="Portable">Portabl</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          {/* <button
            type="button"
            className="px-4 py-2 border text-stone-700 rounded-md hover:bg-stone-50"
          >
            Cancel
          </button> */}
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
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
              "Send for Reporting"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
