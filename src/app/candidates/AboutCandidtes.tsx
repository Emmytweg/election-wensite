// components/AboutCandidtes.tsx
'use client';

import React from 'react';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { aboutcandidates } from '@/info';

const AboutCandidtes: React.FC = () => {
  return (
    <AnimatedTestimonials aboutcandidates={aboutcandidates} />
  );
};

export default AboutCandidtes;
