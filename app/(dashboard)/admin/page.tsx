"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SideNavbar from "./_components/SideNavbar";
import PatientUploadForm from "./_components/CaseUpload";
import ActiveCases from "./_components/ActiveCases";
import CompletedCases from "./_components/CompletedCases";
<<<<<<< HEAD
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
=======
import Users from "./_components/Users";
import clsx from "clsx";
import OrthancData from "./_components/OrthancData";

// Components for each section

const User = () => <Users />;
const UploadSection = () => <PatientUploadForm />;
const Active = () => <ActiveCases />;
const Completed = () => <CompletedCases />;
const Settings = () => <h1 className="text-2xl font-semibold">Settings</h1>;
>>>>>>> c3f08b9 (Study CRUD Added)

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
<<<<<<< HEAD
      case "Dashboard":
        return <Dashboard />;
=======
      case "Users":
        return <User />;
>>>>>>> c3f08b9 (Study CRUD Added)
      case "Upload":
        return <UploadSection />;
      case "Active":
        return <Active />;
      case "Completed":
<<<<<<< HEAD
        return <Completed />;
      case "Performance":
        return <Performance />;
      default:
        return <Dashboard />;
=======
        return <></>;
      case "Settings":
        return <Settings />;
      default:
        return <Active />;
>>>>>>> c3f08b9 (Study CRUD Added)
    }
  };

  return (
    <div className="flex h-screen bg-stone-100">
      {/* Sidebar */}
<<<<<<< HEAD
      <SideNavbar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        Image={Image}
      />
=======
      <div className="z-10">
        <SideNavbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          Image={Image}
        />
      </div>
>>>>>>> c3f08b9 (Study CRUD Added)

      {/* Main Content Area */}
      <main
        className={clsx(
<<<<<<< HEAD
          "flex-1 max-sm:ml-12 max-sm:p-0 p-0 transition-all duration-300 overflow-auto h-screen",
          isOpen ? "ml-64" : "ml-16"
=======
          "flex-1 max-sm:ml-12 max-sm:p-0 p-0 transition-all duration-300  z-0",
          isOpen ? "ml-56" : "ml-16"
>>>>>>> c3f08b9 (Study CRUD Added)
        )}
      >
        {getActiveComponent()}
      </main>
    </div>
  );
}
