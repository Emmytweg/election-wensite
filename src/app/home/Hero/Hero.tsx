"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import elec1 from '../../../images/elec1.jpg'
import elec2 from '../../../images/elec2.jpg'
import elec3 from '../../../images/elec3.jpg'
import elec4 from '../../../images/elec4.jpg'
import elec5 from '../../../images/elec5.jpg'

export default function Hero() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: elec1.src,
  },
  {
    title: "Moonriver",
    link: "https://moonbeam.network",
    thumbnail: elec2.src,
  },
  {
    title: "Moonbase Alpha",
    link: "https://moonbase.moonbeam.network",
    thumbnail: elec3.src,
  },
  {
    title: "Moonwell",
    link: "https://moonwell.fi",
    thumbnail: elec4.src,
  },
  {
    title: "Moonbeam Foundation",
    link: "https://moonbeam.foundation",
    thumbnail: elec5.src,
  }
];
