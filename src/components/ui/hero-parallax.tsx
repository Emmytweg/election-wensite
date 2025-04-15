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

// 🎯 Election day (change as needed)
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
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 10]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[200vh] md:h-[250vh] lg:h-[300vh] py-20 md:py-30 overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
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
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-10 md:space-x-20 mb-10 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-4 sm:space-x-10 md:space-x-20 mb-10 md:mb-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-10 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Vote Now <br /> Your voice, to{" "}
        <span className="text-2xl md:text-7xl font-bold dark:text-white">
          <FlipWords
            words={["Vote", "Participate", "Engage", "Empower", "Decide"]}
          />
        </span>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Participate in the upcoming elections and make your voice heard. <br />
        Every vote counts, and your opinion matters.
      </p>
      <div className="flex justify-start mt-10 text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <Link href="/vote">
            <span>Vote Now</span>
          </Link>
        </HoverBorderGradient>
      </div>

      {/* Countdown */}
      <div className="flex mt-5 items-center justify-center gap-5 text-center auto-cols-max">
        {["days", "hours", "minutes", "seconds"].map((unit, i) => {
          const value = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i];
          return (
            <div
              key={unit}
              className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
            >
              <span className="countdown font-mono text-4xl sm:text-5xl">
                <span style={{ "--value": value } as React.CSSProperties}>
                  {value}
                </span>
              </span>
              {unit}
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
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-20 w-[90vw] sm:h-80 sm:w-96 md:h-96 md:w-[30rem] relative shrink-0"
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
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-xl" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-base sm:text-lg font-semibold">
        {product.title}
      </h2>
    </motion.div>
  );
};
