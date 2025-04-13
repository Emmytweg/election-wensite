import React from "react";
import Image from "next/image";
import logo from "@/app/favicon.ico";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} className="h-8 w-8" alt="TWEG Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TWEG
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About Election
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Guidelines
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Terms & Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact TWEG
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="#" className="hover:underline font-medium">
            TWEG™
          </a>
          . Empowering Student Elections with Technology.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
