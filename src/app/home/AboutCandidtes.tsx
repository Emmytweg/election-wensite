// components/AboutCandidtes.tsx
'use client';

import React from 'react';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { candidates } from '@/info';

const AboutCandidtes: React.FC = () => {
  return (
    <AnimatedTestimonials aboutcandidates={candidates} />
  );
};

export default AboutCandidtes;
