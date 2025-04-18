'use client';

import { useEffect } from 'react';
import { candidates } from '../../info';

const StoreCandidates = () => {
  useEffect(() => {
    if (!localStorage.getItem('candidates')) {
      const serialized = candidates.map((candidate) => ({
        id: candidate.slug, // Use slug as unique ID
        fullName: candidate.name,
        position: candidate.title,
        department: candidate.summary || '',
        image: candidate.image.src, // convert StaticImageData to string
      }));

      localStorage.setItem('candidates', JSON.stringify(serialized));
    }
  }, []);

  return null;
};

export default StoreCandidates;
