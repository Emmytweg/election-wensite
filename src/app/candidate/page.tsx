// app/candidate/page.tsx
import { candidates } from "@/info"; // adjust path based on your structure
import Image from "next/image";
import Link from "next/link";

export default function AllCandidatesPage() {
  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Meet the Candidates</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-3 gap-8">
        {candidates.map((candidate) => (
          <Link key={candidate.slug} href={`/candidate/${candidate.slug}`}>
            <div className="border rounded-xl p-4 hover:shadow-lg transition">
              <Image
                src={candidate.image}
                alt={candidate.name}
                width={300}
                height={300} 
                className="rounded-xl w-full  object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{candidate.name}</h2>
              <p className="text-sm text-gray-600">{candidate.title}</p>
              <p className="text-sm mt-2">{candidate.summary}</p>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
