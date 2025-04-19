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
  const [groupedCandidates, setGroupedCandidates] = useState<{ [key: string]: Candidate[] }>({});
  const [positions, setPositions] = useState<string[]>([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [votes, setVotes] = useState<{ [position: string]: string }>({});

  useEffect(() => {
    const data: Candidate[] = JSON.parse(localStorage.getItem('candidates') || '[]');

    // Group candidates by position
    const groups: { [key: string]: Candidate[] } = {};
    data.forEach((candidate) => {
      if (!groups[candidate.position]) {
        groups[candidate.position] = [];
      }
      groups[candidate.position].push(candidate);
    });

    const allPositions = Object.keys(groups);

    // Load any previous votes
    const storedVotes = JSON.parse(localStorage.getItem('votes') || '{}');

    setGroupedCandidates(groups);
    setPositions(allPositions);
    setVotes(storedVotes);
  }, []);

  const handleVote = (position: string, candidateId: string) => {
    if (votes[position]) return alert('You already voted for this position.');

    const updatedVotes = { ...votes, [position]: candidateId };
    setVotes(updatedVotes);
    localStorage.setItem('votes', JSON.stringify(updatedVotes));
    alert('Vote submitted for ' + position);
  };

  const currentPosition = positions[currentPositionIndex];
  const currentCandidates = groupedCandidates[currentPosition] || [];

  const handleNext = () => {
    if (!votes[currentPosition]) {
      return alert('Please vote before proceeding.');
    }

    if (currentPositionIndex < positions.length - 1) {
      setCurrentPositionIndex(currentPositionIndex + 1);
    } else {
      alert('You have completed voting for all positions.');
    }
  };

  return (
    <div>
      <StoreCandidates />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Vote for {currentPosition}</h1>

        {currentCandidates.length === 0 ? (
          <p>No candidates available for this position.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {currentCandidates.map((candidate) => {
              const hasVotedForPosition = votes[currentPosition];

              return (
                <div
                  key={candidate.id}
                  className={`border rounded-xl p-4 shadow ${
                    votes[currentPosition] === candidate.id ? 'bg-green-100' : 'bg-white'
                  }`}
                >
                  <img
                    src={candidate.image}
                    alt={candidate.fullName}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h2 className="text-lg font-semibold">{candidate.fullName}</h2>
                  <p className="text-sm text-neutral-600">{candidate.department}</p>

                  <button
                    onClick={() => handleVote(currentPosition, candidate.id)}
                    disabled={!!hasVotedForPosition}
                    className={`mt-3 px-4 py-2 rounded-md w-full ${
                      votes[currentPosition] === candidate.id
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } disabled:opacity-50`}
                  >
                    {votes[currentPosition] === candidate.id ? 'Voted' : 'Vote'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleNext}
          className="mt-2 px-6 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
          disabled={!votes[currentPosition]}
        >
          {currentPositionIndex < positions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default Vote;
