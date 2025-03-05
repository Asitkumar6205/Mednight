import Link from "next/link";
import React from "react";
import { FaInstagramSquare, FaPhoneAlt } from "react-icons/fa";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

function Footer() {
  return (
    <div>
      <div className="max-lg:mx-4 lg:mx-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 bg-none">
        <div className="bg-none p-8 rounded-lg shadow-md flex flex-col gap-4">
          <div className="cursor-pointer">
            <h2 className="text-stone-100 text-2xl font-bold bg-none">
              <Link href={"/#home"}>
                <span>Med</span>
                <span className="bg-gradient-to-r from-teal-600 to-stone-700 bg-clip-text text-transparent">
                  night
                </span>
              </Link>
            </h2>
            <h3 className="text-stone-500 font-medium">
              Around-the-clock Diagnostics, Anytime, Anywhere.
            </h3>
          </div>
          <ul className="flex gap-2">
            <li>
              <FaInstagramSquare className="cursor-pointer h-8 w-8 text-pink-700" />
            </li>
            <li>
              <FaFacebook className="cursor-pointer h-8 w-8 text-sky-700" />
            </li>
            <li>
              <FaXTwitter className="cursor-pointer h-8 w-8 text-black" />
            </li>
            <li>
              <FaLinkedin className="cursor-pointer h-8 w-8 text-cyan-700" />
            </li>
          </ul>
        </div>
        <div className="bg-none p-8 rounded-lg shadow-md">
          <h2 className="text-stone-100 text-lg font-bold mb-2">Quick Links</h2>
          <ul>
            <li>
              <Link
                href={"/#services"}
                className="text-stone-500 hover:text-teal-500 "
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href={"/#workflow"}
                className="text-stone-500 hover:text-teal-500"
              >
                Workflow
              </Link>
            </li>
            <li>
              <Link href={"./"} className="text-stone-500 hover:text-teal-500">
                Technology
              </Link>
            </li>
            <li>
              <Link href={"./"} className="text-stone-500 hover:text-teal-500">
                Our Team
              </Link>
            </li>
            <li>
              <Link href={"./"} className="text-stone-500 hover:text-teal-500">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-none p-8 rounded-lg shadow-md">
          <h2 className="text-stone-100 text-lg font-bold mb-2">
            Our Services
          </h2>
          <ul>
            <li>
              <Link href={"./"} className="text-stone-500 hover:text-teal-500">
                X-Ray Reporting
              </Link>
            </li>
            <li>
              <Link href={"./"} className="text-stone-500 hover:text-teal-500">
                CT Scan Analysis
              </Link>
            </li>
            <li>
              <Link href={"./"} className="text-stone-500 hover:text-teal-500">
                MRI Interpretation
              </Link>
            </li>
            <li>
              <Link href={"./"} className="text-stone-500 hover:text-teal-500">
                Ultrasound Reports
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-none p-8 rounded-lg shadow-md">
          <h2 className="text-stone-100 text-lg font-bold mb-2">Contact Us</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <div className="flex flex-row gap-4 items-end">
                <FaPhoneAlt className="h-8 w-8 p-2 text-stone-100 bg-teal-500 rounded-lg" />
                <h2 className="text-stone-400">+91 62054-XXXXX</h2>
              </div>
            </li>
            <li>
              <div className="flex flex-row gap-4 items-end">
                <MdOutlineMailOutline className="h-8 w-8 p-1 text-stone-100 bg-teal-500 rounded-lg flex-none" />
                <h2 className="text-stone-400">contact@mednight.com</h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:mx-14 md:mx-7 max-md:mx-4 sm-lg:4 max-sm:mx-4">
        <div className="w-full h-[1px] rounded-lg bg-stone-700"></div>
      </div>
      <div className="my-7 mx-14 py-4 flex flex-row justify-between ">
        <div className="text-stone-500 max-sm:text-xs">
          © 2025 Mednight Healthcare. All rights reserved.
        </div>
        <div className="flex flex-row gap-4">
          <Link href={"#"} className="text-stone-500 max-sm:text-xs">Privacy Policy</Link>
          <Link href={"#"} className="text-stone-500 max-sm:text-xs">Terms of Service</Link>
          <Link href={"#"} className="text-stone-500 max-sm:text-xs">Cookie Policy</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
