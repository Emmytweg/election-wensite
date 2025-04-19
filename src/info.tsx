// candidates.ts
import john from '../src/images/john.png';
import hilary from '../src/images/hilary.png';
import samuel from '../src/images/samuel.png';
import yung from '../src/images/Yung.png';
import dorcas from '../src/images/dorcas.png';
import kenneth from '../src/images/kenneth.jpeg';
import lillian from '../src/images/lillian.jpeg';
import victor from '../src/images/victor.jpeg'
import { StaticImageData } from 'next/image';

export type CandidateInfo = {
  name: string;
  title: string;
  image: StaticImageData;
  slug: string;
  description: string;
  summary?: string;
  biography?: string;
  agenda?: string[];
  policies?: {
    title: string;
    content: string;
  }[];
  link?: string;
};

export const candidates: CandidateInfo[] = [
  {
    name: "John Doe",
    title: "Candidate for Mayor",
    image: john,
    slug: "john-doe",
    description: "John is a passionate leader with a vision for a better community.",
    summary: "Community-first leader with over 10 years of service.",
    biography: "John Doe is a community-first leader with over 10 years of public service experience. His commitment to social equality and infrastructure development is unwavering.",
    agenda: [
      "Upgrade road infrastructure",
      "Create community job centers",
      "Launch affordable housing programs"
    ],
    policies: [
      {
        title: "Infrastructure",
        content: "John plans to repair and expand city roads, ensuring safer and faster transportation for residents."
      },
      {
        title: "Jobs",
        content: "He will introduce community job hubs and entrepreneurship support schemes."
      },
      {
        title: "Housing",
        content: "Affordable housing units will be prioritized, especially for low-income families."
      }
    ],
    link: "#"
  },
  {
    name: "Jane Smith",
    title: "Candidate for City Council",
    image: hilary,
    slug: "jane-smith",
    description: "Jane has a proven track record of community service and advocacy.",
    summary: "A lifelong advocate for youth and women's empowerment.",
    biography: "Jane Smith is a lifelong advocate for youth and women's empowerment. She's known for her hands-on approach and transparent governance.",
    agenda: [
      "Promote youth skill acquisition",
      "Enhance healthcare services",
      "Empower women through grants"
    ],
    policies: [
      {
        title: "Youth Programs",
        content: "Jane will initiate training and mentorship programs for underprivileged youths."
      },
      {
        title: "Healthcare",
        content: "She advocates for mobile clinics and improved hospital facilities."
      },
      {
        title: "Women Empowerment",
        content: "Jane will fund women-led businesses and education programs."
      }
    ],
    link: "#"
  },
  {
    name: "Mike Johnson",
    title: "Candidate for School Board",
    image: samuel,
    slug: "mike-johnson",
    description: "Mike is dedicated to improving education and supporting our schools.",
    summary: "Education advocate focused on learning innovation and mental health.",
    biography: "Mike Johnson has spent over a decade in education, mentoring students and training teachers. His focus is on learning innovation and mental health.",
    agenda: [
      "Improve school facilities",
      "Implement mental wellness programs",
      "Integrate digital learning"
    ],
    policies: [
      {
        title: "Education Quality",
        content: "Mike will modernize classrooms and provide continuous teacher training."
      },
      {
        title: "Student Wellness",
        content: "Counseling services and mindfulness programs will be added in schools."
      },
      {
        title: "Digital Access",
        content: "Every student will have access to learning tablets and online portals."
      }
    ],
    link: "#"
  },
  {
    name: "Sarah Brown",
    title: "Candidate for Treasurer",
    image: yung,
    slug: "sarah-brown",
    description: "Sarah is a financial expert committed to transparency and accountability.",
    summary: "A certified accountant focused on financial transparency.",
    biography: "Sarah Brown is a certified accountant who has served in financial roles for over 15 years. She's all about transparency, budgeting, and empowering others to understand finance.",
    agenda: [
      "Implement transparent budgeting",
      "Open-access city expenditure reports",
      "Public financial education campaigns"
    ],
    policies: [
      {
        title: "Transparency",
        content: "Sarah will introduce monthly public financial statements."
      },
      {
        title: "Community Engagement",
        content: "Town halls and financial Q&A sessions will be held quarterly."
      },
      {
        title: "Education",
        content: "Finance literacy workshops will be introduced at schools and community centers."
      }
    ],
    link: "#"
  },
  {
    name: "Emily Davis",
    title: "Candidate for Sheriff",
    image: dorcas,
    slug: "emily-davis",
    description: "Emily is a former police officer with a focus on community safety.",
    summary: "Former officer advocating for safe and fair policing.",
    biography: "Emily Davis is a former police officer with a deep understanding of justice and reform. She’s passionate about safe and fair policing.",
    agenda: [
      "Strengthen community-police relations",
      "Expand neighborhood watch programs",
      "Invest in officer training and accountability"
    ],
    policies: [
      {
        title: "Community Safety",
        content: "Emily plans to increase foot patrol and civilian liaisons."
      },
      {
        title: "Trust and Accountability",
        content: "Body cam transparency and public feedback systems will be enforced."
      },
      {
        title: "Education",
        content: "Regular police workshops and training in conflict resolution will be required."
      }
    ],
    link: "#"
  },

  // Additional Candidates for overlapping positions

  {
    name: "Victor James",
    title: "Candidate for Mayor",
    image: victor,
    slug: "victor-james",
    description: "Victor aims to modernize city services and reduce youth unemployment.",
    summary: "Tech-savvy visionary with a strong youth focus.",
    biography: "Victor James is a tech consultant turned politician focused on modernizing governance and solving youth unemployment.",
    agenda: [
      "Digitalize city services",
      "Establish tech hubs for youths",
      "Improve public transportation"
    ],
    policies: [
      {
        title: "Tech Integration",
        content: "Victor will automate permit systems and introduce an e-governance platform."
      },
      {
        title: "Youth Employment",
        content: "Coding bootcamps and job match programs for graduates."
      },
      {
        title: "Transport",
        content: "He plans to introduce electric buses for city routes."
      }
    ],
    link: "#"
  },
  {
    name: "Lilian Grace",
    title: "Candidate for Treasurer",
    image: lillian,
    slug: "lilian-grace",
    description: "Lilian promotes ethical finance and anti-corruption practices.",
    summary: "Advocate for clean accounting and decentralized reporting.",
    biography: "Lilian Grace is a public auditor who has helped investigate multiple corruption cases and believes in full transparency of city accounts.",
    agenda: [
      "Launch anti-corruption watchdog",
      "Digitize revenue collection",
      "Monthly budget transparency reports"
    ],
    policies: [
      {
        title: "Anti-Corruption",
        content: "Whistleblower programs and public audit trails will be created."
      },
      {
        title: "Digital Finance",
        content: "Automated systems for revenue collection to eliminate leakages."
      },
      {
        title: "Community Accountability",
        content: "Monthly meetings to review city expenses with citizens."
      }
    ],
    link: "#"
  },
  {
    name: "Kenneth Cole",
    title: "Candidate for Mayor",
    image: kenneth,
    slug: "kenneth-cole",
    description: "Kenneth believes in sustainable urban growth and community-led development.",
    summary: "Environmental advocate with a grassroots approach.",
    biography: "Kenneth Cole has a background in environmental science and urban planning, and focuses on sustainable growth.",
    agenda: [
      "Plant 10,000 city trees",
      "Create green parks and spaces",
      "Support eco-friendly businesses"
    ],
    policies: [
      {
        title: "Environment",
        content: "Kenneth will reduce city carbon emissions by 40% over 5 years."
      },
      {
        title: "Urban Planning",
        content: "Involve communities in new building project decisions."
      },
      {
        title: "Business",
        content: "Tax cuts for eco-friendly startups."
      }
    ],
    link: "#"
  }
];
