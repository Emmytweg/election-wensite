'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const API_URL = 'https://election-backend-production-b6f7.up.railway.app';

interface AggregatedResults {
  [position: string]: {
    [candidateId: string]: number;
  };
}

interface Candidate {
  id: string;
  fullName: string;
  position: string;
  department: string;
  image: string;
}

const UNLOCK_TIME = new Date('2025-05-17T20:00:00Z'); // 🕒 Adjust as needed

const ResultPage = () => {
  const [timeLeft, setTimeLeft] = useState<number>(UNLOCK_TIME.getTime() - Date.now());
  const [results, setResults] = useState<AggregatedResults>({});
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(UNLOCK_TIME.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isUnlocked = timeLeft <= 0;

  // Fetch candidates
  useEffect(() => {
    const stored = localStorage.getItem('candidates');
    if (stored) setCandidates(JSON.parse(stored));
  }, []);

  // Fetch results
  const fetchResults = async () => {
    try {
      const res = await fetch(`${API_URL}/results`);
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch results');
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      fetchResults();
      const interval = setInterval(fetchResults, 10000); // ⏱ Auto-refresh every 10s
      return () => clearInterval(interval);
    }
  }, [isUnlocked]);

  const formatTimeLeft = () => {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const exportCSV = () => {
    const rows = [['Position', 'Candidate', 'Votes']];
    for (let pos in results) {
      for (let cid in results[pos]) {
        const cand = candidates.find(c => c.id === cid);
        rows.push([
          pos,
          cand ? cand.fullName : cid,
          results[pos][cid].toString()
        ]);
      }
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', 'election_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isUnlocked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Results will be visible in {formatTimeLeft()}</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Election Results</h1>

      <div className="mb-4 text-right">
        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
      </div>

      {Object.keys(results).map(position => (
        <div key={position} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{position}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(results[position])
              .sort((a, b) => b[1] - a[1])
              .map(([candidateId, voteCount]) => {
                const candidate = candidates.find(c => c.id === candidateId);
                return (
                  <motion.div
                    key={candidateId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border p-4 rounded shadow"
                  >
                    {candidate && (
                      <img
                        src={candidate.image}
                        alt={candidate.fullName}
                        className="w-full h-40 object-cover mb-2 rounded"
                      />
                    )}
                    <h3 className="text-lg font-bold">
                      {candidate?.fullName || candidateId}
                    </h3>
                    <p className="text-sm text-gray-500">{voteCount} vote(s)</p>
                  </motion.div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
