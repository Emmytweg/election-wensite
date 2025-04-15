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
    <div className="px-4 relative -top-96 md:px-8 lg:px-20">
      <motion.h1
        className="text-5xl font-bold text-center"
        initial={{ y: -50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-anchor-placement="top-center"
      >
        Candidates
      </motion.h1>

      <motion.p
        className="text-lg text-center mt-4"
        initial={{ y: 30, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-offset="200"
      >
        Here you can find the list of candidates for the election and also know
        more about them by clicking on their profiles to read their full agenda
        and positions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <AboutCandidtes />
      </motion.div>
    </div>
  );
};

export default Candidates;
