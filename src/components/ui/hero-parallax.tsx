"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HoverBorderGradient } from "./hover-border-gradient";
import { FlipWords } from "./flip-words";

const targetDate = new Date("2025-04-25T00:00:00");

const getTimeRemaining = () => {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  return {
    days: Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0),
    hours: Math.max(Math.floor((distance / (1000 * 60 * 60)) % 24), 0),
    minutes: Math.max(Math.floor((distance / 1000 / 60) % 60), 0),
    seconds: Math.max(Math.floor((distance / 1000) % 60), 0),
  };
};

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 3); // Reduced for mobile
  const secondRow = products.slice(3, 6); // Reduced for mobile
  const thirdRow = products.slice(6, 9); // Reduced for mobile
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Reduced parallax effect on mobile
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? 300 : 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isMobile ? -300 : -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? 5 : 15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? 10 : 20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [isMobile ? -200 : -700, 10]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className=" md:h-[250vh] lg:h-[300vh] py-10 md:py-20 overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-2 sm:space-x-4 md:space-x-20 mb-5 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-2 sm:space-x-4 md:space-x-20 mb-5 md:mb-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-2 sm:space-x-4 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl relative mx-auto py-10 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-3xl md:text-7xl font-bold dark:text-white">
        Vote Now <br /> Your voice, to{" "}
        <span className="text-3xl md:text-7xl font-bold dark:text-white">
          <FlipWords
            words={["Vote", "Participate", "Engage", "Empower", "Decide"]}
            duration={isMobile ? 3000 : 2000} // Slower on mobile for better readability
          />
        </span>
      </h1>
      <p className="max-w-2xl text-sm md:text-xl mt-4 md:mt-8 dark:text-neutral-200">
        Participate in the upcoming elections and make your voice heard. <br className="hidden sm:block" />
        Every vote counts, and your opinion matters.
      </p>
      <div className="flex justify-start mt-6 md:mt-10 text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-4 py-2 text-sm md:text-base"
        >
          <Link href="/vote">
            <span>Vote Now</span>
          </Link>
        </HoverBorderGradient>
      </div>

      {/* Countdown - Responsive */}
      <div className="flex flex-wrap justify-center mt-5 gap-2 md:gap-5 text-center auto-cols-max">
        {["days", "hours", "minutes", "seconds"].map((unit, t) => {
          const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][t];
          return (
            <div
              key={unit}
              className="flex flex-col p-1 md:p-2 bg-neutral rounded-box text-neutral-content min-w-[60px] md:min-w-[80px]"
            >
              <span className="countdown font-mono text-2xl sm:text-3xl md:text-5xl">
                <span style={{ "--value": value } as React.CSSProperties}>
                  {value}
                </span>
              </span>
              <span className="text-xs md:text-sm">{unit}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
  isMobile,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
  isMobile: boolean;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: isMobile ? -10 : -20,
      }}
      key={product.title}
      className={`group/product ${isMobile ? 'h-40 w-40' : 'h-80 w-96 md:h-96 md:w-[30rem]'} relative shrink-0`}
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-center absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
          priority={false}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-xl" />
      <h2 className="absolute bottom-2 left-2 md:bottom-4 md:left-4 opacity-0 group-hover/product:opacity-100 text-white text-xs sm:text-sm md:text-lg font-semibold">
        {product.title}
      </h2>
    </motion.div>
  );
};