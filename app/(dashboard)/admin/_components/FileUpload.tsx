"use client"; // For Next.js App Router
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] }, // Accept only images
    multiple: true, // Allow multiple files
  });

  return (
    <div className="flex flex-col items-center p-5">
      {/* Drag and Drop Area */}
      <div
        {...getRootProps()}
        className={`w-full max-w-lg p-6 border-2 border-dashed rounded-lg cursor-pointer 
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} `}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 text-center">
          {isDragActive ? "Drop the files here..." : "Drag & drop files here, or click to select"}
        </p>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="mt-4 w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Selected Files:</h2>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center space-x-3 p-2 border rounded-md">
                {file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
