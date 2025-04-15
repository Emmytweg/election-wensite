import { candidates } from "@/info";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function CandidatePage({ params }) {
  const candidate = candidates.find((c) => c.slug === params.slug);

  if (!candidate) return notFound();

  return (
    <div className="px-4 md:px-20 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {candidate.name}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{candidate.title}</p>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <Image
            src={candidate.image}
            alt={candidate.name}
            width={300}
            height={300}
            className="rounded-xl object-cover shadow-md"
          />

          <div className="flex-1 space-y-6">
            {/* About */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {candidate.description}
              </p>
            </section>

            {/* Agenda */}
            {candidate.agenda?.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Agenda
                </h2>
                <ul className="list-disc ml-5 space-y-1 text-gray-700">
                  {candidate.agenda.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Policies */}
            {candidate.policies?.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Policies
                </h2>
                <ul className="space-y-3">
                  {candidate.policies.map((policy, idx) => (
                    <li key={idx} className="text-gray-700">
                      <strong className="text-gray-900">{policy.title}:</strong>{" "}
                      {policy.content}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
