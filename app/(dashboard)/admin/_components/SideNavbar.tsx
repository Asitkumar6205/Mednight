"use client";
import { Menu, X, Home, Settings, LogOut, ChartNoAxesCombined, Upload, ClipboardCheck, MonitorDot } from "lucide-react";
import clsx from "clsx";

interface SideNavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeComponent: string;
  setActiveComponent: (component: string) => void;
  Image?: string | null;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isOpen, setIsOpen, activeComponent, setActiveComponent, Image }) => {
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
    </div>
  );
};

export default SideNavbar;
