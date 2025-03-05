"use client"
import Navbar from "./landingpage/Navbar";
import { Button } from "@/components/ui/button";
import { PiLightningBold } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa6";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import Services from "./landingpage/Services";
import Workflow from "./landingpage/Workflow";
import Technology from "./landingpage/Technology";
import Ourteam from "./landingpage/Ourteam";
import Testimonials from "./landingpage/Testimonials";
import Impact from "./landingpage/Impact";
import Getintouch from "./landingpage/Getintouch";
import Footer from "./landingpage/Footer";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Tracks the current route

  useEffect(() => {
    if (loading && pathname === "/signin") {
      setLoading(false); // Stop loading once on /signin
    }
  }, [pathname, loading]);

  const handleClick = () => {
    setLoading(true);
    router.push("/signin");
  };

  return (
    <div id="home">
      <Navbar />
      <div className="flex flex-col pt-20">
        <h1 className="lg:mx-14 max-md:mx-6 md:mx-6  max-sm:mx-4 max-w-2xl font-extrabold text-4xl md:text-6xl mb-6 bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent">
          Around-the-clock Diagnostics, Anytime, Anywhere.
        </h1>
        <h2 className="lg:mx-14 max-sm:mx-4 max-md:mx-6 md:mx-6  max-w-2xl font-extra-bold lg:text-2xl md:text-2xl mb-8 bg-gradient-to-r from-stone-400 to-stone-100 bg-clip-text text-transparent">
          Delivering seamless teleradiology solutions with precise diagnostics
          and quick turnaround times, available 24/7.
        </h2>
      </div>
      <Button
        onClick={handleClick}
        disabled={loading}
        className="bg-teal-500 text-lg h-[50px] lg:ml-14 max-md:ml-6 md:ml-6 xs:ml-2 max-sm:ml-4 font-bold hover:bg-teal-600 lg:pl-14 lg:pr-14"
      >
        {loading ? <Loader2 className="animate-spin" size={24} /> : "Get Started"}
      </Button>
      <Button className="mb-6 text-lg border-teal-500 border-solid h-[50px] max-md:ml-6 md:ml-6 xs:ml-2 max-sm:ml-4 max-sm:mt-4 lg:pl-9 lg:pr-9 border-[1px] hover:bg-teal-500 font">
        Learn More
      </Button>
      <div className="lg:mx-14 max-md:mx-6 md:mx-6 xs:mx-2 max-sm:mx-4 mb-10 grid lg:grid-cols-3 md:grid-cols-2 gap-8 relative">
        <div className="bg-stone-800 p-8 rounded-lg">
          <PiLightningBold className="h-7 w-7 text-teal-500 mb-2" />
          <h2 className="text-white text-lg font-bold">Quick Turnaround</h2>
          <h3 className="bg-gradient-to-r from-stone-400 to-stone-100 bg-clip-text text-transparent">
            Fast and accurate reporting for all imaging modalities
          </h3>
        </div>
        <div className="bg-stone-800 p-8 rounded-lg">
          <FaRegClock className="h-7 w-7 text-teal-500 mb-2" />
          <h2 className="text-white text-lg font-bold">24/7 Availability</h2>
          <h3 className="bg-gradient-to-r from-stone-400 to-stone-100 bg-clip-text text-transparent">
            Round-the-clock expert radiologist support
          </h3>
        </div>
        <div className="bg-stone-800 p-8 rounded-lg">
          <RiVerifiedBadgeLine className="h-8 w-8 text-teal-500 mb-2" />
          <h2 className="text-white text-lg font-bold">Expert Analysis</h2>
          <h3 className="bg-gradient-to-r from-stone-400 to-stone-100 bg-clip-text text-transparent">
            Trusted diagnostics across all modalities
          </h3>
        </div>
      </div>
      <Services />
      <Workflow />
      <Technology />
      <Ourteam />
      <Testimonials />
      <Impact />
      <Getintouch />
      <Footer />
    </div>
  );
}
