"use client";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxCaretSort } from "react-icons/rx";

interface Study {
  ID: string;
  PatientName: string;
  PatientID: string;
  PatientSex: string;
  StudyDescription: string;
  StudyDate: string;
  StudyTime: string;
  Modality: string;
  Series: number;
}

export default function ActiveCasesPage() {
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStudyID, setSelectedStudyID] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [studies, setStudies] = useState<Study[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const fetchStudies = async () => {
    try {
      const response = await fetch("/api/studies");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
      const data: Study[] = await response.json();

      // Only update state if new studies are found (without reloading the page)
      if (data.length !== studies.length) {
        setStudies(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies(); // Initial fetch
    const interval = setInterval(fetchStudies, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleDeleteStudy = async (studyId: string | null) => {
    setShowSuccess(false);
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/deleteStudy", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studyId }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowDeleteConfirm(false);
        setShowSuccess(true);

        // Update the study list without refreshing the page
        setStudies((prevStudies) =>
          prevStudies.filter((study) => study.ID !== studyId)
        );

        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      } else {
        setErrorMessage(data.message || "Failed to delete study.");
      }
    } catch (error) {
      console.error("Error deleting study:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllStudies = async () => {
    setShowSuccess(false);
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/deleteAllStudies", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        setShowSuccess(true);
        setStudies([]); // Clear the studies list after deletion

        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      } else {
        setErrorMessage(data.message || "Failed to delete studies.");
      }
    } catch (error) {
      console.error("Error deleting all studies:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setShowConfirmModal(false); // Ensure modal closes regardless of success or failure
    }
  };

  const parseStudyDate = (
    studyDate: string
  ): { dateObj: Date | null; formattedDate: string | null } => {
    if (!/^\d{8}$/.test(studyDate))
      return { dateObj: null, formattedDate: null }; // Ensure valid format

    const year = parseInt(studyDate.substring(0, 4));
    const month = parseInt(studyDate.substring(4, 6)) - 1;
    const day = parseInt(studyDate.substring(6, 8));

    const dateObj = new Date(year, month, day);
    const formattedDate = `${day.toString().padStart(2, "0")}/${(month + 1)
      .toString()
      .padStart(2, "0")}/${year}`; // DD/MM/YYYY

    return { dateObj, formattedDate };
  };

  // Filter Orders Based on Search & Date Range
  const filteredStudies = studies.filter((study) => {
    const { dateObj: createdAt, formattedDate } = parseStudyDate(
      study.StudyDate
    );

    // If parsing fails, exclude this study from filtering
    if (!createdAt) return false;

    const matchesSearch =
      study.PatientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.PatientID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.StudyDescription.includes(searchQuery) ||
      (formattedDate && formattedDate.includes(searchQuery)) || // Check formatted date
      study.Modality.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDateRange =
      (!fromDate || createdAt >= new Date(fromDate)) &&
      (!toDate || createdAt <= new Date(toDate));

    return matchesSearch && matchesDateRange;
  });

  // Calculate Pagination
  const totalPages = Math.ceil(filteredStudies.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedOrders = filteredStudies.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    if (displayedOrders.length === 0 && filteredStudies.length > 0) {
      setCurrentPage(1); // Redirect to first page if empty
    }
  }, [displayedOrders, filteredStudies]);

  const formatStudyTime = (studyTime: string): string | null => {
    if (!/^\d{6}(\.\d+)?$/.test(studyTime)) return null;

    const hours = studyTime.substring(0, 2);
    const minutes = studyTime.substring(2, 4);
    const seconds = studyTime.substring(4, 6);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="p-4 relative h-auto min-h-screen">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-1 px-4 rounded-sm shadow-lg text-center transition-opacity duration-500">
          ✅ Deletion Successfull!
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-sm shadow-lg text-center transition-opacity duration-500">
          ❌ {errorMessage}
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-4">Active Cases </h1>

      {/* Search Bar & Date Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-1">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by Order Id, Patient, Modality ..."
            className="border bg-stone-100 p-2 rounded-sm min-w-96 md:w-1/3 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="date"
            className="border bg-stone-100 p-2 rounded-sm focus:outline-none"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="border bg-stone-100 p-2 rounded focus:outline-none"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4 items-end cursor-pointer">
          <div className="relative group">
            {/* Sort Icon */}
            <RxCaretSort className="h-8 w-8" />

            {/* Tooltip - Positioned just above the icon */}
            <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-stone-950 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              Sort
            </span>
          </div>

          {/* Button */}
          <button
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}
            onClick={() => setShowConfirmModal(true)}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-sm shadow-md hover:bg-red-600 disabled:opacity-50"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Main Content */}
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr>
            {[
              "Patient Id",
              "Patient Name",
              "Study Description",
              "Gender",
              "Modality",
              "Study Date",
              "Series",
              "Action",
            ].map((col) => (
              <th
                key={col}
                className="bg-purple-600 text-white shadow-lg border-stone-300 px-2 py-2 text-center whitespace-nowrap"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedOrders.length > 0
            ? displayedOrders.map((study) => (
                <tr
                  key={study.ID}
                  className="hover:bg-stone-200 bg-stone-100 shadow-md"
                >
                  <td className="border-l border-b border-t border-stone-300 px-2 py-4 text-center">
                    {study.PatientID}
                  </td>
                  <td className="border-b border-t border-stone-300 px-2 py-4 text-center">
                    {study.PatientName}
                  </td>
                  <td className="border-b border-t border-stone-300 px-2 py-4 text-center">
                    {study.StudyDescription}
                  </td>
                  <td className="border-b border-t border-stone-300 px-2 py-4 text-center">
                    {study.PatientSex}
                  </td>
                  <td className="border-b border-t border-stone-300 px-2 py-4 text-center">
                    {study.Modality}
                  </td>
                  <td className="border-b border-t border-stone-300 px-2 py-4 text-center">
                    {parseStudyDate(study.StudyDate).formattedDate}{" "}
                    {formatStudyTime(study.StudyTime)}
                  </td>
                  <td className="border-b border-t border-stone-300 px-2 py-4 text-center">
                    {study.Series}
                  </td>
                  <td className="border-t border-b border-r border-stone-300 px-2 py-4 items-center justify-center flex">
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(true);
                        setSelectedStudyID(study.ID);
                      }}
                      disabled={loading}
                      className="text-white py-2 mr-2"
                    >
                      <Trash className="text-red-600" />
                    </button>
                    <Link
                      href={{
                        pathname: "/admin/create-order",
                        query: {
                          id: study.ID,
                          patientId: study.PatientID,
                          name: study.PatientName,
                          description: study.StudyDescription,
                          gender: study.PatientSex,
                          modality: study.Modality,
                          studyDate: parseStudyDate(study.StudyDate)
                            .formattedDate,
                          time: formatStudyTime(study.StudyTime),
                          series: study.Series,
                        },
                      }}
                    >
                      <ChevronRight
                        className="bg-purple-500 text-white m-2 p-1 h-8 w-8 rounded-full"
                        onClick={() => {
                          setLoading(true);
                        }}
                      />
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showConfirmModal && !loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-sm shadow-lg w-96 text-center">
            <p className="mb-4">
              Are you sure you want to delete all studies? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-stone-200 px-4 py-2 rounded-sm shadow-sm hover:bg-stone-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAllStudies}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded-sm shadow-sm hover:bg-red-600 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && !loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white text-black p-6 rounded-sm shadow-md">
            <p className="mb-4">Are you sure you want to delete this study?</p>
            <div className="flex space-x-4 justify-center">
              <button
                className="px-4 py-2 bg-stone-200 rounded-sm shadow-sm hover:bg-stone-400"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-sm shadow-sm hover:bg-red-600"
                onClick={() => handleDeleteStudy(selectedStudyID)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && ( // Hide pagination if there's only 1 page
        <div className="fixed bottom-4 right-4 flex items-center space-x-2 p-2">
          {/* Previous Button */}
          <button
            className={`p-1 rounded-full ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-stone-200"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          {/* Page Numbers (Only show up to 5 pages at a time) */}
          {(() => {
            const pages = [];
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);

            if (endPage - startPage < 4) {
              startPage = Math.max(1, endPage - 4);
            }

            for (let i = startPage; i <= endPage; i++) {
              pages.push(i);
            }

            return pages.map((page) => (
              <button
                key={page}
                className={`px-2 py-[2px] rounded-full text-sm ${
                  currentPage === page
                    ? "bg-purple-500 text-white"
                    : "bg-stone-200 hover:bg-stone-300"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ));
          })()}

          {/* Next Button */}
          <button
            className={`p-1 rounded-full ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-stone-200"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
