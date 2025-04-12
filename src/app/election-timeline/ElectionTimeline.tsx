import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import activities from '../../images/activities.jpg'
import workshop from '../../images/workshop.jpg'
import campaign from '../../images/campaign.jpg'
import campaignTwo from '../../images/campaign-two.jpg'
export function ElectionTimeline() {
  const data = [
    {
      title: "March 2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
Lift of Ban By the Electoral Committee      
    </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Replace these with your actual election-related images later */}
            <Image src={activities} alt="Election launch" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" />
            {/* <Image src="/images/campaign-banners.jpg" alt="Campaign banners" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" /> */}
            {/* <Image src="/images/debate-stage.jpg" alt="Debate stage" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" /> */}
            {/* <Image src="/images/candidate-photos.jpg" alt="Candidate profiles" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" /> */}
          </div>
        </div>
      ),
    },
    {
      title: "April 2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Preparations for the election began. The electoral committee was formed, and nomination forms were made available to all eligible students.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Workshops were also held to educate students on fair campaigning practices and digital voting.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image src={workshop} alt="Workshop session" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" />
            {/* <Image src="/images/electoral-committee.jpg" alt="Electoral committee" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" /> */}
            {/* <Image src="/images/nomination-form.jpg" alt="Nomination form" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" /> */}
            {/* <Image src="/images/student-info-session.jpg" alt="Info session" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" /> */}
          </div>
        </div>
      ),
    },
    {
      title: "May 2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
Campaign Activities has Began
          </p>
          {/* <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">✅ Voter registration system integrated</div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">✅ Candidate profile pages launched</div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">✅ Voting system with live results added</div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">✅ Election news and announcements section</div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">✅ Mobile optimization for student access</div>
          </div> */}
          <div className="grid grid-cols-2 gap-4">
            <Image src={campaign} alt="Voting interface" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" />
            <Image src={campaignTwo} alt="Candidate profile preview" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" />
            {/* <Image src="/images/live-results.jpg" alt="Live results dashboard" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" /> */}
            {/* <Image src="/images/announcements.jpg" alt="Announcement panel" width={500} height={500} className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg" /> */}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
