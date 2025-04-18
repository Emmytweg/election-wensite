'use client';

import React, { useEffect, useState } from 'react';
import StoreCandidates from './StoredCandidates';

interface Candidate {
  id: string;
  fullName: string;
  position: string;
  department: string;
  image: string;
}

const Vote = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch candidates from localStorage (replace with API if needed)
    const data = JSON.parse(localStorage.getItem('candidates') || '[]');
    setCandidates(data);

    // Check if user has already voted
    const votedId = localStorage.getItem('votedCandidateId');
    if (votedId) {
      setHasVoted(true);
      setVotedCandidateId(votedId);
    }
  }, []);

  const handleVote = (id: string) => {
    if (hasVoted) {
      alert("You've already voted!");
      return;
    }

    // Save vote
    localStorage.setItem('votedCandidateId', id);
    setHasVoted(true);
    setVotedCandidateId(id);
    alert("Your vote has been submitted successfully!");
  };

  return (
    <div>
      <StoreCandidates />
 <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cast Your Vote</h1>

      {candidates.length === 0 ? (
        <p>No candidates available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`border rounded-xl p-4 shadow hover:shadow-md transition duration-300 ${
                votedCandidateId === candidate.id ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <img
                src={candidate.image}
                alt={candidate.fullName}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold">{candidate.fullName}</h2>
              <p className="text-sm text-neutral-600">{candidate.position}</p>
              <p className="text-sm text-neutral-500">{candidate.department}</p>

              <button
                onClick={() => handleVote(candidate.id)}
                disabled={hasVoted}
                className={`mt-3 px-4 py-2 rounded-md w-full ${
                  votedCandidateId === candidate.id
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:opacity-50`}
              >
                {votedCandidateId === candidate.id ? 'Voted' : 'Vote'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
   
  );
};

export default Vote;
