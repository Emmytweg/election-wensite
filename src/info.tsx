// info.ts
import { StaticImageData } from 'next/image';
import john from '../src/images/john.png';
import hilary from '../src/images/hilary.png';
import samuel from '../src/images/samuel.png';
import yung from '../src/images/Yung.png';
import dorcas from '../src/images/dorcas.png';

export type Testimonial = {
  name: string;
  title: string;
  description: string;
  image: StaticImageData;
  link?: string;
};

export const aboutcandidates: Testimonial[] = [
  {
    name: "John Doe",
    title: "Candidate for Mayor",
    description: "John is a passionate leader with a vision for a better community.",
    image: john,
    link: '#',
  },
  {
    name: "Jane Smith",
    title: "Candidate for City Council",
    description: "Jane has a proven track record of community service and advocacy.",
    image: hilary,
    link: '#',
  },
  {
    name: "Mike Johnson",
    title: "Candidate for School Board",
    description: "Mike is dedicated to improving education and supporting our schools.",
    image: samuel,
  },
  {
    name: "Sarah Brown",
    title: "Candidate for Treasurer",
    description: "Sarah is a financial expert committed to transparency and accountability.",
    image: yung,
    link: '#',
  },
  {
    name: "Emily Davis",
    title: "Candidate for Sheriff",
    description: "Emily is a former police officer with a focus on community safety.",
    image: dorcas,
    link: '#',
  },
];
