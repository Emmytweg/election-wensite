'use client';

import React, { useEffect, useState } from 'react';

interface Candidate {
  id: string;
  fullName: string;
  position: string;
  department: string;
  image: string;
}

interface UserVote {
  userId: string;
  votes: {
    [position: string]: string;
  };
}

const ResultPage = () => {
  const unlockTime = new Date("2025-04-20T17:00:00");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [voteCounts, setVoteCounts] = useState<{ [candidateId: string]: number }>({});
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [groupedByPosition, setGroupedByPosition] = useState<{ [position: string]: Candidate[] }>({});
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://election-website-hgha.onrender.com';

  useEffect(() => {
    const allCandidates: Candidate[] = JSON.parse(localStorage.getItem('candidates') || '[]');
    setCandidates(allCandidates);

    const groupByPosition = () => {
      const grouped: { [position: string]: Candidate[] } = {};
      allCandidates.forEach(candidate => {
        if (!grouped[candidate.position]) {
          grouped[candidate.position] = [];
        }
        grouped[candidate.position].push(candidate);
      });
      setGroupedByPosition(grouped);
    };

    const fetchVotes = async () => {
      try {
        const res = await fetch(`${API_URL}/votes`);
        const data = await res.json();
        const allVotes: UserVote[] = data.votes || [];

        const countMap: { [candidateId: string]: number } = {};
        allCandidates.forEach(candidate => {
          countMap[candidate.id] = 0;
        });

        let total = 0;
        allVotes.forEach(userVote => {
          Object.values(userVote.votes).forEach(candidateId => {
            if (countMap[candidateId] !== undefined) {
              countMap[candidateId]++;
              total++;
            }
          });
        });

        setVoteCounts(countMap);
        setTotalVotes(total);
        groupByPosition();
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchVotes();
  }, []);

  if (new Date() < unlockTime) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">
          Results will be available after {unlockTime.toLocaleString()}
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-10">🗳️ Election Results</h1>

      {Object.keys(groupedByPosition).length === 0 ? (
        <p className="text-center">No candidates available.</p>
      ) : (
        Object.entries(groupedByPosition).map(([position, candidates]) => {
          const topVote = Math.max(...candidates.map(c => voteCounts[c.id] || 0));

          return (
            <div key={position} className="mb-12">
              <h2 className="text-xl font-semibold mb-4 border-b pb-1 uppercase tracking-wide text-blue-700">{position}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {candidates.map(candidate => {
                  const count = voteCounts[candidate.id] || 0;
                  const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : '0';
                  const isTop = count === topVote && count > 0;

                  return (
                    <div key={candidate.id} className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4">
                      <img
                        src={candidate.image}
                        alt={candidate.fullName}
                        className="w-full h-40 object-cover object-center rounded-lg mb-3"
                      />
                      <h3 className="text-lg font-bold flex items-center">
                        {candidate.fullName}
                        {isTop && <span className="ml-2 text-yellow-500 text-xl">👑</span>}
                      </h3>
                      <p className="text-sm text-gray-500">{candidate.department}</p>

                      <div className="mt-3">
                        <p className="font-medium text-green-700">Votes: {count} ({percentage}%)</p>
                        <div className="w-full bg-gray-200 rounded h-2 mt-1">
                          <div
                            className="bg-green-500 h-2 rounded transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      <div className="mt-16 text-center">
        <p className="text-xl font-bold">
          Total Votes Cast: <span className="text-blue-700">{totalVotes}</span>
        </p>
      </div>
    </div>
  );
};

export default ResultPage;
