"use client";
<<<<<<< HEAD
import { Menu, X, Home, Settings, LogOut, ChartNoAxesCombined, Upload, ClipboardCheck, MonitorDot } from "lucide-react";
=======
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, X, Settings, LogOut, Upload, ClipboardCheck, MonitorDot, CircleUserRound } from "lucide-react";
>>>>>>> c3f08b9 (Study CRUD Added)
import clsx from "clsx";

interface SideNavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeComponent: string;
  setActiveComponent: (component: string) => void;
  Image?: string | null;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isOpen, setIsOpen, activeComponent, setActiveComponent, Image }) => {
<<<<<<< HEAD
  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-stone-900 text-white max-lg:p-3 lg:p-5 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "max-lg:w-12 lg:w-16"
      }`}
    >
      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="mb-4 hover:text-purple-500">
        {isOpen ? <X className="max-lg:w-5 max-lg:h-5 lg:w-6 lg:h-6 hover:text-purple-500"/> : <Menu className="lg-max:w-5 lg-max:h-5 lg:w-6 lg:h-6" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1">
        <ul>
          {[
            { name: "Dashboard", icon: <Home className="w-5 h-5" /> },
            { name: "Upload", icon: <Upload className="w-5 h-5" /> },
            { name: "Active", icon: <MonitorDot className="w-5 h-5" /> },
            { name: "Completed", icon: <ClipboardCheck className="w-5 h-5" /> },
            { name: "Performance", icon: <ChartNoAxesCombined className="w-5 h-5" /> },
          ].map((item) => (
            <li
              key={item.name}
              className={clsx(
                "mb-4 flex items-center space-x-3 cursor-pointer hover:text-purple-500",
                activeComponent === item.name && "text-purple-500"
              )}
              onClick={() => setActiveComponent(item.name)}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="flex flex-row items-center justify-between space-x-3">
        <div className="flex-none -m-[2px]">
          {Image && <img src={Image} alt="User Avatar" className="w-7 h-7 rounded-full" />}
        </div>
        <div className="flex space-x-3 items-center">
          {isOpen && <Settings className="w-5 h-5 cursor-pointer hover:text-stone-300" />}
          <div className="flex gap-1 items-center cursor-pointer hover:text-stone-300">
            {isOpen && <LogOut className="w-5 h-5" />}
            {isOpen && <span>Logout</span>}
          </div>
        </div>
      </div>
=======
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setShowLogoutConfirm(false);
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      await signOut({ redirect: true, callbackUrl: "/signin" });
      router.push("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-stone-900 text-white max-lg:p-3 lg:p-5 flex flex-col transition-all duration-300 ${
        isOpen ? "w-56" : "max-lg:w-12 lg:w-16"
      }`}
    >
      {isLoggingOut && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900 bg-opacity-90">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500"></div>
        </div>
      )}

      {!isLoggingOut && (
        <>
          <button onClick={() => setIsOpen(!isOpen)} className="mb-4 hover:text-purple-500">
            {isOpen ? <X className="max-lg:w-5 max-lg:h-5 lg:w-6 lg:h-6 hover:text-purple-500"/> : <Menu className="lg-max:w-5 lg-max:h-5 lg:w-6 lg:h-6" />}
          </button>

          <nav className="flex-1">
            <ul>
              {[
                { name: "Upload", icon: <Upload className="w-5 h-5" /> },
                { name: "Active", icon: <MonitorDot className="w-5 h-5" /> },
                { name: "Completed", icon: <ClipboardCheck className="w-5 h-5" /> },
                { name: "Users", icon: <CircleUserRound className="w-5 h-5" /> },
                { name: "Settings", icon: <Settings className="w-5 h-5" /> },
              ].map((item) => (
                <li
                  key={item.name}
                  className={clsx(
                    "mb-4 flex items-center space-x-3 space-y-1 cursor-pointer hover:text-purple-500",
                    activeComponent === item.name && "text-purple-500"
                  )}
                  onClick={() => setActiveComponent(item.name)}
                >
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-row items-center justify-between space-x-3">
            <div className="flex-none -m-[2px]">
              {Image && <img src={Image} alt="User Avatar" className="w-7 h-7 rounded-full" />}
            </div>
            <div className="flex space-x-3 items-center">
              <div
                className="flex gap-1 items-center cursor-pointer hover:text-stone-300"
                onClick={() => setShowLogoutConfirm(true)}
              >
                {isOpen && <LogOut className="w-5 h-5" />}
                {isOpen && <span>Logout</span>}
              </div>
            </div>
          </div>
        </>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex space-x-4 justify-center">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
>>>>>>> c3f08b9 (Study CRUD Added)
    </div>
  );
};

export default SideNavbar;
