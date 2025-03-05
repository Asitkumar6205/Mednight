"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SideNavbar from "./_components/SideNavbar";
import PatientUploadForm from "./_components/CaseUpload";
import ActiveCases from "./_components/ActiveCases";
import CompletedCases from "./_components/CompletedCases";
import Session from "./_components/UserSession";
import clsx from "clsx";

// Components for each section
const Dashboard = () => <Session />;
const UploadSection = () => <PatientUploadForm />;
const Active = () => <ActiveCases />;
const Completed = () => <CompletedCases />;
const Performance = () => (
  <h1 className="text-2xl font-semibold">Performance</h1>
);

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const { data: session } = useSession();
  const Image = session?.user?.image;

  useEffect(() => {
    const data = window.localStorage.getItem("sidebarOpen");
    if (data !== null) {
      setIsOpen(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  // Function to get the selected component
  const getActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Upload":
        return <UploadSection />;
      case "Active":
        return <Active />;
      case "Completed":
        return <Completed />;
      case "Performance":
        return <Performance />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-stone-100">
      {/* Sidebar */}
      <SideNavbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        Image={Image}
      />

      {/* Main Content Area */}
      <main
        className={clsx(
          "flex-1 max-sm:ml-12 max-sm:p-0 p-0 transition-all duration-300 overflow-auto h-screen",
          isOpen ? "ml-64" : "ml-16"
        )}
      >
        {getActiveComponent()}
      </main>
    </div>
  );
}
