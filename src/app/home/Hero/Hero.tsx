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
    title: "",
    link: "",
    thumbnail: elec1.src,
  },
  {
    title: "",
    link: "",
    thumbnail: elec2.src,
  },
  {
    title: "",
    link: "",
    thumbnail: elec3.src,
  },
  {
    title: "",
    link: "",
    thumbnail: elec4.src,
  },
  {
    title: "",
    link: "",
    thumbnail: elec5.src,
  }
];
