<<<<<<< HEAD
import { useEffect, useState } from "react";

interface Order {
  id: number;
  patientName: string;
  gender: string;
  study: string;
  modality: string;
  assignedTo: string;
  date: string;
  priority: string;
  message: string;
  files: string[];
  image: string;
}

export default function ActiveCases() {
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    fetch("/api/orders")
  .then(async (res) => {
    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      throw new Error("Received non-JSON response");
    }
  })
  .then((data) => setOrders(data))
  .catch((error) => console.error("Error fetching orders:", error));

  }, []);
  

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            {[
              "Order Id",
              "Patient Name",
              "Gender",
              "Study",
              "Modality",
              "Assigned To",
              "Date",
              "Priority",
              "Message",
              "Files",
              "Image",
              "Action",
            ].map((col) => (
              <th key={col} className="border border-gray-300 px-4 py-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.patientName}</td>
                <td className="border border-gray-300 px-4 py-2">{order.gender}</td>
                <td className="border border-gray-300 px-4 py-2">{order.study}</td>
                <td className="border border-gray-300 px-4 py-2">{order.modality}</td>
                <td className="border border-gray-300 px-4 py-2">{order.assignedTo}</td>
                <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                <td className="border border-gray-300 px-4 py-2">{order.priority}</td>
                <td className="border border-gray-300 px-4 py-2">{order.message}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.files.length} files
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={order.image} alt="Scan" className="w-10 h-10 object-cover" />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center py-4">No Orders Found</td>
            </tr>
          )}
        </tbody>
      </table>
=======
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Delete, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function ActiveCases() {
  const [tableLoading, setTabletableLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await fetch("/api/studies");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        setStudies(data);
        console.log(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setTabletableLoading(false);
      }
    };

    fetchStudies();
  }, []);

  const handleDeleteStudy = async (studyId: string | null) => { 
    setShowSuccess(false);
    setDeleteLoading(true);
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
        
        setTimeout(() => {
          setShowSuccess(false);
          window.location.reload();
        }, 3000);
      } else {
        setErrorMessage(data.message || "Failed to delete study.");
      }
    } catch (error) {
      console.error("Error deleting study:", error);
    } finally {
      setDeleteLoading(false);
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

  const formatStudyTime = (studyTime: string): string | null => {
    if (!/^\d{6}(\.\d+)?$/.test(studyTime)) return null;

    const hours = studyTime.substring(0, 2);
    const minutes = studyTime.substring(2, 4);
    const seconds = studyTime.substring(4, 6);

    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <div className="p-4">
      {deleteLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900 bg-opacity-90">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500"></div>
        </div>
      )}
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg text-center transition-opacity duration-500">
          ✅ Study deleted successfully!
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md shadow-lg text-center transition-opacity duration-500">
          ❌ {errorMessage}
        </div>
      )}
      <h1 className="text-2xl font-semibold mb-4">Active Cases </h1>

      {/* Search Bar & Date Filters */}
      <div className="flex flex-wrap gap-4 mb-1">
        <input
          type="text"
          placeholder="Search by Order Id, Patient, Modality ..."
          className="border p-2 rounded w-full md:w-1/3 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded focus:outline-none"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded focus:outline-none"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {tableLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <table className="w-full border-separate border-spacing-y-3">
            <thead className="bg-black">
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
                    className="border-separate drop-shadow-lg bg-purple-500 text-white shadow-lg border-gray-300 px-2 py-2 text-center text-l whitespace-nowrap"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedOrders.length > 0 ? (
                displayedOrders.map((study, index) => {
                  const dicomPath = `C:/Users/asit_/Downloads/case${index + 1}`;
                  const weasisUrl = `weasis://${encodeURIComponent(
                    `$dicom:get -l "${dicomPath}"`
                  )}`;

                  return (
                    <tr
                      key={study.ID}
                      className="hover:bg-stone-100 bg-stone-50 shadow-md"
                    >
                      <td className="border-l border-b border-t boder border-gray-300 px-2 py-4 text-center">
                        {study.PatientID}
                      </td>
                      <td className="border-b border-t boder border-gray-300 px-2 py-4 text-center">
                        {study.PatientName}
                      </td>
                      <td className="border-b border-t border-gray-300 px-2 py-4 whitespace-nowrap text-center">
                        {study.StudyDescription}
                      </td>
                      <td className="border-b border-t border-gray-300 px-2 py-4 text-center">
                        {study.PatientSex}
                      </td>
                      <td className="border-b border-t border-gray-300 px-2 py-4 text-center">
                        {study.Modality}
                      </td>
                      <td className="border-b border-t border-gray-300 px-2 py-4 text-center">
                        {parseStudyDate(study.StudyDate).formattedDate}{" "}
                        {formatStudyTime(study.StudyTime)}
                      </td>
                      <td className="border-b border-t border-gray-300 px-2 py-4 text-center">
                        {study.Series}
                      </td>

                      <td className="border-t border-b border-r border-gray-300 px-2 py-4 items-center justify-center flex flex-row">
                        <button
                          // href={weasisUrl}
                          // target="_blank"
                          // rel="noopener noreferrer"
                          onClick={() => {
                            setShowDeleteConfirm(true);
                            setSelectedStudyID(study.ID);
                          }}
                          disabled={deleteLoading}
                          className=" text-white p-1 mr-2"
                        >
                          <Trash className="text-red-600" />
                        </button>
                        <Link href={"#"}>
                          <ChevronRight className="bg-purple-500 text-white p-1 h-8 w-8 rounded-full" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && !deleteLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white text-black p-6 rounded-lg shadow-md">
                <p className="mb-4">
                  Are you sure you want to delete this study?
                </p>
                <div className="flex space-x-4 justify-center">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
                    : "hover:bg-gray-200"
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
                        : "bg-gray-200 hover:bg-gray-300"
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
                    : "hover:bg-gray-200"
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
        </>
      )}
>>>>>>> c3f08b9 (Study CRUD Added)
    </div>
  );
}
