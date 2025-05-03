"use client";

import React, { useEffect } from "react";
import AboutCandidtes from "./AboutCandidtes";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Candidates = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="px-4 relative sm:px-6 md:px-8 lg:px-20 py-8 sm:py-12 sm:-top-[55px]">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
        initial={{ y: -50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        data-aos="fade-up"
        data-aos-offset="100" // Reduced from 200 for mobile
        data-aos-delay="50"
        data-aos-anchor-placement="top-center"
      >
        Candidates
      </motion.h1>

      <motion.p
        className="text-base sm:text-lg text-center mt-3 sm:mt-4 max-w-2xl mx-auto px-2"
        initial={{ y: 30, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-offset="100" // Reduced from 200 for mobile
      >
        Here you can find the list of candidates for the election and also know
        more about them by clicking on their profiles to read their full agenda
        and positions.
      </motion.p>

      <motion.div
        className="mt-6 sm:mt-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-offset="100" // Reduced from 200 for mobile
      >
        <AboutCandidtes />
      </motion.div>
    </div>
  );
};

export default Candidates;