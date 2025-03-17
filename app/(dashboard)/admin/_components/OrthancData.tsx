"use client";

import { useEffect, useState } from "react";

interface Study {
  PatientName: string;
  PatientID: string;
  StudyDescription: string;
  StudyDate: string;
  StudyInstanceUID: string;
  Modality: string;
  NumberOfStudyRelatedSeries: number;
}

export default function StudiesList() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await fetch("/api/studies");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        setStudies(data);
        console.log(data)
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  if (loading) return <p>Loading studies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Studies List</h2>
      {studies.length === 0 ? (
        <p>No studies found.</p>
      ) : (
        <ul className="space-y-4">
          {studies.map((study) => (
            <li key={study.StudyInstanceUID} className="p-4 border rounded-lg shadow-md">
              <p><strong>Patient Name:</strong> {study.PatientName}</p>
              <p><strong>Patient ID:</strong> {study.PatientID}</p>
              <p><strong>Description:</strong> {study.StudyDescription}</p>
              <p><strong>Date:</strong> {study.StudyDate}</p>
              <p><strong>Modality:</strong> {study.Modality}</p>
              <p><strong>Series Count:</strong> {study.NumberOfStudyRelatedSeries}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
